import { createStackNavigator } from "react-navigation-stack"; // Version can be specified in package.json
import { createAppContainer } from "react-navigation";

import PickImage from "./PickImage";
import ConfirmAddress from "./ConfirmAddress";
import ComplaintType from "./ComplaintType";
import CompassSelect from "./CompassSelect";
import ConfirmSubmission from "./ConfirmSubmission";

const RootStack = createStackNavigator(
  {
    CompassSelect: CompassSelect,
    ComplaintType: ComplaintType,
    ConfirmAddress: ConfirmAddress,
    ConfirmSubmission: ConfirmSubmission,
    Home: PickImage
  },
  {
    initialRouteName: "Home"
  }
);

export const AppContainer = createAppContainer(RootStack);
