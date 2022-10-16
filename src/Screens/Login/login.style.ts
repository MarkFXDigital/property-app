import {StyleSheet} from "react-native";
import {theme} from "../../theme";


export const loginStyle = StyleSheet.create({
   content: {
       display: "flex",
       flex: 1,
       justifyContent: "center",
       flexDirection: "row",
       backgroundColor: "rgb(242,242,242)"
   },
   view: {
       width: "80%"
   },
   cardTitle:{
     color:"#ad974f"
   },
    cardButton:{
       margin: 2,
        marginLeft: 0,
        marginRight: 0
    }
})
