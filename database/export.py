#!/usr/bin/env python3
import argparse
import csv
import io
import os
import shutil
import sqlite3
import subprocess
import sys

# pip install xlsxwriter
#from xlsxwriter.workbook import Workbook

"""
    NB: This need mdbtools (`brew install mdbtools`) in order to work

    Wraps mdbtools to rescue data from an .mdb file and make it accessible via:
        1. csv
        2. xlsx
        3. sqlite

    Doesn't rely on pandas for ease of debugging / installation etc.
"""


def run_command(cmd):
    """runs the command, returns the utf-8 decoded output as a single string"""
    s = subprocess.check_output(cmd)
    return s.decode("utf-8")


def list_tables(filename):
    delimiter = ", "
    u = run_command(["mdb-tables", "-d", delimiter, filename])
    tables = u.split(delimiter)
    return [stripped for t in tables if (stripped := t.strip()) != ""]


def read(dbname, tablename, readfn=csv.reader):
    u = run_command(["mdb-export", dbname, tablename])
    f = io.StringIO(u)
    r = readfn(f)
    return [row for row in r]


def export_csv(dbname, tablename):
    u = run_command(["mdb-export", dbname, tablename])
    with open(tablename + ".csv", "w") as f:
        f.write(u)
    print("wrote %d bytes to %s.csv" % (len(u), tablename))


#def export_excel(dbname, tables, filename):
#    workbook = Workbook(filename)
#    rows, cols = 0, 0
#    for table in tables:
#        data = read(dbname, table)
#        header = data[0]
#        print("%s has %d columns" % (table, len(header)))
#        worksheet = workbook.add_worksheet(table)
#        for i, row in enumerate(data):
#            worksheet.write_row(i, 0, row)
#        cols += len(header)
#        rows += len(data)

#    print(
#        "Wrote %d tables with a total of %d cols and %d rows to %s"
#        % (len(table), cols, rows, filename)
#    )

#    workbook.close()


def prompt_overwrite(filename):
    if os.path.exists(filename):
        response = (
            input(f"The file '{filename}' already exists. Overwrite? (Y/n): ")
            .strip()
            .lower()
        )
        r = response in ["", "y"]
        if r:
            os.remove(filename)
        else:
            print("Operation cancelled.")
        return r

    return True


def export_sqlite(dbname, tablenames, filename):
    print(f"creating {filename}")
    con = sqlite3.connect(filename)
    cur = con.cursor()

    # Populate It.
    create = "mdb-schema --indexes --relations --default-values --not-null".split(" ")
    for table in tablenames:
        print(f"creating table {table}")
        table_create = run_command(create + [dbname, "-T", table, "sqlite"])
        cur.execute(table_create)

        sql = run_command(["mdb-export", "-I", "sqlite", "-S", "1", dbname, table])
        for i, ins in enumerate(sql.split(";\n")):
            cur.execute(ins)

        print(f"inserted {i} records into {table}")
        con.commit()
    con.close()


def check_env():
    tools = ["mdb-schema", "mdb-export", "mdb-tables"]
    missing_tools = [tool for tool in tools if not shutil.which(tool)]
    if missing_tools:
        print(f"Missing required tools: {', '.join(missing_tools)}")
        print("Please install mdbtools. On MacOS, use 'brew install mdbtools'.")
        sys.exit(1)


def main():
    check_env()
	print(f"maina")
    parser = argparse.ArgumentParser(description="Convert MDB files to CSV, XLSX, or SQLite")
    parser.add_argument("mdb_file", help="Path to the MDB file")
    parser.add_argument("format", help="Export format: csv, xlsx, or sqlite")
    args = parser.parse_args()

    dbfile = args.mdb_file
    if not os.path.exists(dbfile):
        print(f"Can't find {dbfile}!")
        sys.exit(1)

    tables = list_tables(dbfile)

    match args.format.lower():
        case "csv":
            for table in tables:
                if table:
                    export_csv(args.mdb_file, table)
        case "xlsx":
            outfile = dbfile.replace(".mdb", ".xlsx")
            if prompt_overwrite(outfile):
                export_excel(dbfile, tables, outfile)
        case "sqlite":
            outfile = dbfile.replace(".mdb", ".sqlite")
            if prompt_overwrite(outfile):
                export_sqlite(filename, tables, outfile)
        case _:
            print("Invalid format. Choose 'csv', 'xlsx', or 'sqlite'.")


if __name__ == "__main__":
    main()