import {Appbar} from "react-native-paper";
import React from "react";


export const HeaderBar = (props: HeaderParams) => {
    return(
        <Appbar>
            <Appbar.BackAction />
            <Appbar.Content title={props.title} />
        </Appbar>
    )
}

interface HeaderParams{
    title: string
}
