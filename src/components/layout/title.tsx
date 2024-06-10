import {ThemedTitleV2} from "@refinedev/antd";
import logo from "../../assets/Logo.png";
import {Image} from "antd";

export function Title({width}: {width: number}) {
    return (
        <img width={width} src={logo}/>
    );
}
