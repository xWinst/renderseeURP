import { useState, useEffect, useCallback } from "react";
import { Panel } from "components";
import { addEventListener, removeEventListener } from "services";
import s from "./Aside.module.css";

const Aside = ({ functions }) => {
    const [name, setName] = useState();
    const { sendMessage } = functions;

    const setColor = useCallback(
        (event) => {
            const { color } = event.detail;
            if (name) sendMessage("RoomController", "setColor", JSON.stringify({ name, color }));
        },
        [name, sendMessage]
    );

    const setTexture = useCallback(
        (event) => {
            const { texture } = event.detail;
            if (name)
                sendMessage("RoomController", "setTexture", JSON.stringify({ name, texture }));
        },
        [name, sendMessage]
    );

    useEffect(() => {
        document.body.addEventListener("color", setColor);
        document.body.addEventListener("texture", setTexture);
        addEventListener("picker", setName);
        return () => {
            document.body.removeEventListener("color", setColor);
            document.body.removeEventListener("texture", setTexture);
            removeEventListener("picker", setName);
        };
    }, [setColor, setTexture, setName]);

    return (
        <aside className={s.asideActive}>
            <div className={s.container}>
                <p>Selected Object:</p>
                <p className={s.name}>{name}</p>
            </div>
            <Panel />

            <div className={s.text}>
                <p>
                    Camera rotation: mouse movement while holding down the left mouse button or the
                    “Q”, “E”, “R”, “F” keys.
                </p>
                <p>
                    Camera movement: mouse movement while holding down the right mouse button or the
                    “W”, “A”, “S”, “D” keys.
                </p>
                <p>Zoom: mouse wheel or "Left Ctrl", "Left Shift" keys.</p>
            </div>
        </aside>
    );
};

export default Aside;
