import { createStackNavigator } from "react-navigation-stack"; // Version can be specified in package.json
import { createAppContainer } from "react-navigation";

import PickImage from "./PickImage";
import ConfirmAddress from "./ConfirmAddress";
import ComplaintType from "./ComplaintType";

const RootStack = createStackNavigator(
  {
    Home: PickImage,
    ConfirmAddress: ConfirmAddress,
    ComplaintType: ComplaintType
  },
  {
    initialRouteName: "Home"
  }
);

export const AppContainer = createAppContainer(RootStack);
