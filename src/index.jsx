import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

//Import statement to indicate you need to bundle `./index.scss`
import "./index.scss";

//Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return (
        <Container style={{border: "1 px solid white"}}>
            <MainView />
        </Container>
    );
};

//Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);