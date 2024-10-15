
import { useState } from 'react'
import { createPortal } from 'react-dom'
import logo from '~/img/logo.svg';
import { BackHeader } from './BackHeader'


export const RevenueAnalysis = () => {
    return (
        <div className="">
            {/*<!-- 最上方標題導覽列 -->*/}
            <BackHeader />
            {/*<!-- 中間主要內容 -->*/}
            <div className="main-content container">
                {/*<!-- 營收分析 -->*/}
                <div className="page revenueAnalysis" style={{ display: "block" }}>
                    <div id="revenueAnalysis">
                        <h4>單品銷售概況<select className="ms-2" id="selectCat">
                            <option value="all">全品項</option>
                            <option value="c01">蛋餅</option>
                            <option value="c02">吐司</option>
                            <option value="c03">漢堡</option>
                            <option value="c04">沙拉</option>
                            <option value="c05">點心</option>
                            <option value="c06">飲品</option></select></h4>
                        <div id="chart1" className="c3" style={{ "maxHeight": "320px", position: "relative" }}>
                            <svg width="531.2" height="320" style={{ overflow: "hidden" }}>
                                <g transform="translate(60.5,4.5)">
                                    <text className="c3-text c3-empty" textAnchor="middle" dominantBaseline="middle" x="200.6" y="133" style={{ opacity: 0 }}></text>
                                    <g clipPath="url(http://localhost:5568/backstage.html#c3-1727121227311-clip)" className="c3-regions" style={{ visibility: "visible" }}></g>
                                    <g clipPath="url(http://localhost:5568/backstage.html#c3-1727121227311-clip-grid)" className="c3-grid" style={{ visibility: "visible" }}>
                                        <g className="c3-xgrid-focus">
                                            <line className="c3-xgrid-focus" x1="385" x2="385" y1="0" y2="266" style={{ visibility: "hidden" }}></line></g>
                                    </g>
                                    <g clipPath="url(http://localhost:5568/backstage.html#c3-1727121227311-clip)" className="c3-chart">

                                        <g className="c3-event-rects" style={{ "fill-opacity": 0 }}><rect className="c3-event-rect" x="0" y="0" width="401.2" height="266" ></rect></g>
                                        <g className="c3-chart-bars">
                                            <g className="c3-chart-bar c3-target c3-target-銷量" style={{ "pointer-events": "none" }}>
                                                <g className=" c3-shapes c3-shapes-銷量 c3-bars c3-bars-銷量" style={{ cursor: "pointer" }}>
                                                    <path className="c3-shape c3-shape-0 c3-bar c3-bar-0" d="M 2.55,266 L2.55,231.58 L17,231.58 L17,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-1 c3-bar c3-bar-1" d="M 36.55,266 L36.55,214.37662337662337 L51,214.37662337662337 L51,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-2 c3-bar c3-bar-2" d="M 69.55,266 L69.55,248.8 L84,248.8 L84,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-3 c3-bar c3-bar-3" d="M 103.55,266 L103.55,248.8 L118,248.8 L118,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-4 c3-bar c3-bar-4" d="M 136.55,266 L136.55,231.58 L151,231.58 L151,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-5 c3-bar c3-bar-5" d="M 170.55,266 L170.55,231.58 L185,231.58 L185,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-6 c3-bar c3-bar-6" d="M 203.55,266 L203.55,25.1 L218,25.1 L218,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-7 c3-bar c3-bar-7" d="M 237.55,266 L237.55,248.8 L252,248.8 L252,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-8 c3-bar c3-bar-8" d="M 270.55,266 L270.55,231.58 L285,231.58 L285,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-9 c3-bar c3-bar-9" d="M 303.55,266 L303.55,231.58 L318,231.58 L318,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-10 c3-bar c3-bar-10" d="M 337.55,266 L337.55,145.55 L352,145.55 L352,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-11 c3-bar c3-bar-11" d="M 370.55,266 L370.55,197.17 L385,197.17 L385,266 z" style={{ stroke: "rgb(31, 119, 180)", fill: "rgb(31, 119, 180)", opacity: 1 }}></path></g>
                                            </g>
                                            <g className="c3-chart-bar c3-target c3-target-金額" style={{ "pointer-events": "none" }}>
                                                <g className=" c3-shapes c3-shapes-金額 c3-bars c3-bars-金額" style={{ cursor: "pointer" }}>
                                                    <path className="c3-shape c3-shape-0 c3-bar c3-bar-0" d="M 17,266 L17,156.5 L31.45,156.5 L31.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-1 c3-bar c3-bar-1" d="M 51,266 L51,140.1 L65.45,140.1 L65.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-2 c3-bar c3-bar-2" d="M 84,266 L84,249.57438016528926 L98.45,249.57438016528926 L98.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-3 c3-bar c3-bar-3" d="M 118,266 L118,205.77 L132.45,205.77 L132.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-4 c3-bar c3-bar-4" d="M 151,266 L151,25.1 L165.45,25.1 L165.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-5 c3-bar c3-bar-5" d="M 185,266 L185,90.79338842975206 L199.45,90.79338842975206 L199.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-6 c3-bar c3-bar-6" d="M 218,266 L218,112.7 L232.45,112.7 L232.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-7 c3-bar c3-bar-7" d="M 252,266 L252,233.1487603305785 L266.45,233.1487603305785 L266.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-8 c3-bar c3-bar-8" d="M 285,266 L285,200.3 L299.45,200.3 L299.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-9 c3-bar c3-bar-9" d="M 318,266 L318,200.3 L332.45,200.3 L332.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-10 c3-bar c3-bar-10" d="M 352,266 L352,118.1694214876033 L366.45,118.1694214876033 L366.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path>
                                                    <path className="c3-shape c3-shape-11 c3-bar c3-bar-11" d="M 385,266 L385,200.3 L399.45,200.3 L399.45,266 z" style={{ stroke: "rgb(255, 127, 14)", fill: "rgb(255, 127, 14)", opacity: 1 }}></path></g>
                                            </g>
                                        </g>
                                        <g className="c3-chart-lines">
                                            <g className="c3-chart-line c3-target c3-target-銷量" style={{ opacity: 1, "pointer-events": "none" }}>
                                                <g className=" c3-shapes c3-shapes-銷量 c3-lines c3-lines-銷量"></g>
                                                <g className=" c3-shapes c3-shapes-銷量 c3-areas c3-areas-銷量"></g>
                                                <g className=" c3-selected-circles c3-selected-circles-銷量"></g>
                                                <g className=" c3-shapes c3-shapes-銷量 c3-circles c3-circles-銷量" style={{ cursor: "pointer" }}></g>
                                            </g>
                                            <g className="c3-chart-line c3-target c3-target-金額" style={{ opacity: 1, "pointer-events": "none" }}>
                                                <g className=" c3-shapes c3-shapes-金額 c3-lines c3-lines-金額"></g>
                                                <g className=" c3-shapes c3-shapes-金額 c3-areas c3-areas-金額"></g>
                                                <g className=" c3-selected-circles c3-selected-circles-金額"></g>
                                                <g className=" c3-shapes c3-shapes-金額 c3-circles c3-circles-金額" style={{ cursor: "pointer" }}></g>
                                            </g>
                                        </g>
                                        <g className="c3-chart-arcs" transform="translate(200.6,128)">
                                            <text className="c3-chart-arcs-title" style={{ "text-anchor": "middle", opacity: 0 }}></text></g>
                                        <g className="c3-chart-texts">
                                            <g className="c3-chart-text c3-target c3-target-銷量  " style={{ opacity: 1, "pointer-events": "none" }}>
                                                <g className=" c3-texts c3-texts-銷量">
                                                    <text className=" c3-text c3-text-0" textAnchor="middle" x="9.775" y="228.58" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>2</text>
                                                    <text className=" c3-text c3-text-1" textAnchor="middle" x="43.775" y="211.37662337662337" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>3</text>
                                                    <text className=" c3-text c3-text-2" textAnchor="middle" x="76.775" y="245.8" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>1</text>
                                                    <text className=" c3-text c3-text-3" textAnchor="middle" x="110.775" y="245.8" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>1</text>
                                                    <text className=" c3-text c3-text-4" textAnchor="middle" x="143.775" y="228.58" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>2</text>
                                                    <text className=" c3-text c3-text-5" textAnchor="middle" x="177.775" y="228.58" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>2</text>
                                                    <text className=" c3-text c3-text-6" textAnchor="middle" x="210.775" y="22.1" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>14</text>
                                                    <text className=" c3-text c3-text-7" textAnchor="middle" x="244.775" y="245.8" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>1</text>
                                                    <text className=" c3-text c3-text-8" textAnchor="middle" x="277.775" y="228.58" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>2</text>
                                                    <text className=" c3-text c3-text-9" textAnchor="middle" x="310.775" y="228.58" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>2</text>
                                                    <text className=" c3-text c3-text-10" textAnchor="middle" x="344.775" y="142.55" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>7</text>
                                                    <text className=" c3-text c3-text-11" textAnchor="middle" x="377.775" y="194.17" style={{ stroke: "none", fill: "rgb(31, 119, 180)", "fill-opacity": 1 }}>4</text></g>
                                            </g>
                                            <g className="c3-chart-text c3-target c3-target-金額  " style={{ opacity: 1, "pointer-events": "none" }}>
                                                <g className=" c3-texts c3-texts-金額">
                                                    <text className=" c3-text c3-text-0" textAnchor="middle" x="24.225" y="153.5" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$100</text>
                                                    <text className=" c3-text c3-text-1" textAnchor="middle" x="58.225" y="137.1" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$115</text>
                                                    <text className=" c3-text c3-text-2" textAnchor="middle" x="91.225" y="246.57438016528926" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$15</text>
                                                    <text className=" c3-text c3-text-3" textAnchor="middle" x="125.225" y="202.77" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$55</text>
                                                    <text className=" c3-text c3-text-4" textAnchor="middle" x="158.225" y="22.1" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$220</text>
                                                    <text className=" c3-text c3-text-5" textAnchor="middle" x="192.225" y="87.79338842975206" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$160</text>
                                                    <text className=" c3-text c3-text-6" textAnchor="middle" x="225.225" y="109.7" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$140</text>
                                                    <text className=" c3-text c3-text-7" textAnchor="middle" x="259.225" y="230.1487603305785" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$30</text>
                                                    <text className=" c3-text c3-text-8" textAnchor="middle" x="292.225" y="197.3" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$60</text>
                                                    <text className=" c3-text c3-text-9" textAnchor="middle" x="325.225" y="197.3" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$60</text>
                                                    <text className=" c3-text c3-text-10" textAnchor="middle" x="359.225" y="115.1694214876033" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$135</text>
                                                    <text className=" c3-text c3-text-11" textAnchor="middle" x="392.225" y="197.3" style={{ stroke: "none", fill: "rgb(255, 127, 14)", "fill-opacity": 1 }}>$60</text></g>
                                            </g>
                                        </g>
                                    </g>
                                    <g clipPath="url(http://localhost:5568/backstage.html#c3-1727121227311-clip-grid)" className="c3-grid c3-grid-lines">
                                        <g className="c3-xgrid-lines"></g>
                                        <g className="c3-ygrid-lines"></g>
                                    </g>
                                </g>
                                <g transform="translate(0,300)">
                                    <g className="c3-legend-item c3-legend-item-銷量" style={{ visibility: "visible", cursor: "pointer" }}>
                                        <text x="247.6" y="9" style={{ "pointer-events": "none" }}>銷量</text><rect className="c3-legend-item-event" x="233.6" y="-5" width="49" height="17.6" style={{ "fill-opacity": 0 }}></rect>
                                        <line className="c3-legend-item-tile" x1="231.6" y1="4" x2="241.6" y2="4" strokeWidth="10" style={{ stroke: "rgb(31, 119, 180)", "pointer-events": "none" }}></line></g>
                                    <g className="c3-legend-item c3-legend-item-金額" style={{ visibility: "visible", cursor: "pointer" }}>
                                        <text x="296.6" y="9" style={{ "pointer-events": "none" }}>金額</text><rect className="c3-legend-item-event" x="282.6" y="-5" width="39" height="17.6" style={{ "fill-opacity": 0 }}></rect>
                                        <line className="c3-legend-item-tile" x1="280.6" y1="4" x2="290.6" y2="4" strokeWidth="10" style={{ stroke: "rgb(255, 127, 14)", "pointer-events": "none" }}></line></g>
                                </g>
                            </svg>
                        <div className="c3-tooltip-container" style={{ position: "absolute", "pointer-events": "none", display: "none", top: "144.7px", left: "350.7px" }}><table className="c3-tooltip"><tbody>
                            <tr><th colSpan="2">經典紅茶</th></tr>
                            <tr className="c3-tooltip-name--銷量">
                                <td className="name"><span style={{ "backgroundColor": "#1f77b4" }}></span>銷量</td>
                                <td className="value">4</td></tr>
                            <tr className="c3-tooltip-name--金額">
                                <td className="name"><span style={{ "backgroundColor": "#ff7f0e" }}></span>金額</td>
                                <td className="value">$60</td></tr></tbody></table></div></div>
                    <br />
                    <h4>各類型銷售概況</h4>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div id="chart2" className="*col-6 text-center c3" style={{ "maxHeight": "320px", position: "relative" }}>
                            <svg width="350" height="320" style={{ overflow: "hidden" }}><defs>
                                <clipPath id="c3-1727121227358-clip"><rect width="350" height="296"></rect></clipPath>
                                <clipPath id="c3-1727121227358-clip-xaxis"><rect x="-31" y="-20" width="412" height="40"></rect></clipPath>
                                <clipPath id="c3-1727121227358-clip-yaxis"><rect x="-29" y="-4" width="20" height="320"></rect></clipPath>
                                <clipPath id="c3-1727121227358-clip-grid"><rect width="350" height="296"></rect></clipPath>
                                <clipPath id="c3-1727121227358-clip-subchart"><rect width="350" height="0"></rect></clipPath></defs>
                                <g transform="translate(0.5,4.5)">
                                    <text className="c3-text c3-empty" textAnchor="middle" dominantBaseline="middle" x="175" y="148" style={{ opacity: 0 }}></text>
                                    <g className="c3-xgrid-focus">
                                        <line className="c3-xgrid-focus" x1="-10" x2="-10" y1="0" y2="296" style={{ visibility: "hidden" }}></line></g>
                                </g>
                                <g transform="translate(0,300)">
                                    <g className="c3-legend-item c3-legend-item-蛋餅" style={{ visibility: "visible", cursor: "pointer" }}>
                                        <text x="47" y="9" style={{ "pointer-events": "none" }}>蛋餅</text><rect className="c3-legend-item-event" x="33" y="-5" width="49" height="17.6" style={{ "fill-opacity": 0 }}></rect>
                                        <line className="c3-legend-item-tile" x1="31" y1="4" x2="41" y2="4" strokeWidth="10" style={{ stroke: "rgb(31, 119, 180)", "pointer-events": "none" }}></line></g>
                                </g>
                                <text className="c3-title" x="175" y="0"></text></svg>
                            <div className="c3-tooltip-container" style={{ position: "absolute", "pointer-events": "none", display: "none" }}></div></div>
                        <div id="chart3" className="*col-6 text-center c3" style={{ "maxHeight": "320px", position: "relative" }}>
                            <svg width="350" height="320" style={{ overflow: "hidden" }}><defs>
                                <clipPath id="c3-1727121227389-clip"><rect width="350" height="296"></rect></clipPath>
                                <clipPath id="c3-1727121227389-clip-xaxis"><rect x="-31" y="-20" width="412" height="40"></rect></clipPath>
                                <clipPath id="c3-1727121227389-clip-yaxis"><rect x="-29" y="-4" width="20" height="320"></rect></clipPath>
                                <clipPath id="c3-1727121227389-clip-grid"><rect width="350" height="296"></rect></clipPath>
                                <clipPath id="c3-1727121227389-clip-subchart"><rect width="350" height="0"></rect></clipPath></defs>
                                <g transform="translate(0.5,4.5)">
                                    <text className="c3-text c3-empty" textAnchor="middle" dominantBaseline="middle" x="175" y="148" style={{ opacity: 0 }}></text>
                                    <g className="c3-xgrid-focus">
                                        <line className="c3-xgrid-focus" x1="-10" x2="-10" y1="0" y2="296" style={{ visibility: "hidden" }}></line></g>
                                </g>
                                <g transform="translate(0,300)">
                                    <g className="c3-legend-item c3-legend-item-蛋餅" style={{ visibility: "visible", cursor: "pointer" }}>
                                        <text x="47" y="9" style={{ "pointer-events": "none" }}>蛋餅</text><rect className="c3-legend-item-event" x="33" y="-5" width="49" height="17.6" style={{ "fill-opacity": 0 }}></rect>
                                        <line className="c3-legend-item-tile" x1="31" y1="4" x2="41" y2="4" strokeWidth="10" style={{ stroke: "rgb(31, 119, 180)", "pointer-events": "none" }}></line></g>
                                </g>
                                <text className="c3-title" x="175" y="0"></text></svg>
                            <div className="c3-tooltip-container" style={{ position: "absolute", "pointer-events": "none", display: "none" }}></div></div>
                    </div>
                </div>
            </div>
        </div>
            {/*<!-- 頁尾 -->*/ }
    <div className="footer py-2">
        <div className="container">
        </div>
    </div>
        </div >
    )
}