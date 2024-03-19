import { useState } from "react";
import { textures } from "textures";
import { colors } from "settings";
import s from "./Panel.module.css";

const Panel = () => {
    const [settings, setSettings] = useState({
        color: null,
        texture: null,
        intensity: 0.8,
        ambient: 0.78,
    });
    // const [intesity, setIntensity] = useState(1);

    const changeProp = (name, value) => {
        // console.log("value: ", value);
        setSettings((prev) => ({ ...prev, [name]: value }));
        const param = name === "texture" ? value.name : value;
        // console.log("value.name: ", value.name);
        // console.log("value: ", value);
        document.body.dispatchEvent(new CustomEvent(name, { detail: { [name]: param } }));
    };

    const changeLight = (e) => {
        const { name, value } = e.target;
        changeProp(name, value);
    };

    return (
        <div>
            <div className={s.prop}>
                <p>Light Intensity (bulbs)</p>
                <input
                    className={s.count}
                    type="range"
                    name="intensity"
                    min={0}
                    max={2}
                    step={0.01}
                    value={settings.intensity}
                    onChange={changeLight}
                />
            </div>

            <div className={s.prop}>
                <p>Ambient Intensity</p>
                <input
                    className={s.count}
                    type="range"
                    name="ambient"
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.ambient}
                    onChange={changeLight}
                />
            </div>
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
