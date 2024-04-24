import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import defaultData from "./data.json";

import MainPage from "./components/page/MainPage";
import PostWritePage from "./components/page/PostWritePage";
import PostViewPage from "./components/page/PostViewPage";
import { useEffect, useState } from "react";
import DataContext from "./context/DataContext";

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: ${({ $pointer }) => $pointer};
`;

const MainTitle = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <MainTitleText
            $pointer={location.pathname !== "/" ? "pointer" : "default"}
            onClick={() => (location.pathname !== "/" ? navigate("/") : null)}
        >
            미니 블로그
        </MainTitleText>
    );
};

function App() {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || defaultData);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(data));
    }, [data]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            <BrowserRouter>
                <MainTitle />
                <Routes>
                    <Route index element={<MainPage />} />
                    <Route path="/write" element={<PostWritePage />} />
                    <Route path="/:postId" element={<PostViewPage />} />
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    );
}

export default App;
