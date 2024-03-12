import { useState } from "react";
import { textures } from "textures";
import { colors } from "settings";
import s from "./Panel.module.css";

const Panel = () => {
    const [settings, setSettings] = useState({ color: null, texture: null });

    const changeProp = (name, value) => {
        console.log("value: ", value);
        setSettings((prev) => ({ ...prev, [name]: value }));
        const param = name === "color" ? value : value.name;
        document.body.dispatchEvent(new CustomEvent(name, { detail: { [name]: param } }));
    };

    return (
        <div>
            <div className={s.prop}>
                <p>Color</p>
                <ul className={s.colorList}>
                    {colors.map((color) => (
                        <li
                            className={color === settings.color ? s.active : s.item}
                            key={color}
                            onClick={() => changeProp("color", color)}
                        >
                            <div className={s.color} style={{ backgroundColor: color }}></div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={s.prop}>
                <p>Texture</p>
                <ul className={s.colorList}>
                    {textures.map((image, i) => (
                        <li
                            className={image === settings.texture ? s.activeTexture : s.texture}
                            key={image.name}
                            onClick={() => changeProp("texture", image)}
                        >
                            <img src={image.img} width={60} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Panel;
