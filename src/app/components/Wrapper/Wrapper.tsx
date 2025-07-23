import { Advertisment } from "../Advertisment/Adveristment"
import { Categories } from "../Categories/Categories"
import { Header } from "../Header/Header"
import { MainContent } from "../MainContent/MainContent"

export const Wrapper = () => {
    return (
        <div>
            <Advertisment/>
            <Header/>
            <Categories/>
            <MainContent/>
        </div>
    )
}