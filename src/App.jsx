import { Routes, Route, BrowserRouter} from 'react-router-dom'

import MainLogo from './pages/mainlogo'
import { Order } from './pages/Order'
import { Home } from './pages/home'
import { Other } from './pages/other'
import { NotFound } from './pages/notfound'
import { BackStage } from './backstage/BackStage'
import { ProductManage } from './backstage/ProductManage'
import { RevenueAnalysis } from './backstage/RevenueAnalysis'
import { FoceAtom_extemplat } from './foce/index'

let TTT=()=><div>asdfasdf</div>
const App = () =>
   <BrowserRouter basename="/">
        <Routes>
            <Route index element={<Order />} />
            <Route path="/order" element={<Order />} />
            <Route path="/backstage" element={<BackStage />} />
            <Route path="/productmanage" element={<ProductManage />} />
            <Route path="/revenueanalysis" element={<RevenueAnalysis />} />
            <Route path="/main" element={<MainLogo />} />
            <Route path="/home" element={<Home />} />
            <Route path="/other" element={<Other />} />
            <Route path="*" element={<FoceAtom_extemplat />} />
        </Routes>
</BrowserRouter>

export default App;
