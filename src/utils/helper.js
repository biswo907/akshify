import { useNavigation } from "@react-navigation/native";

export const resetAndNavigate = newPath => {
  const navigation = useNavigation();

  navigation.reset({
    index: 0,
    routes: [
      {
        name: typeof newPath === "string" ? newPath : newPath.pathname,
        params: typeof newPath === "object" ? newPath.params : {}
      }
    ]
  });
};

export const handleGoBack = () => {
  const navigation = useNavigation();

  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    console.warn("No screen to go back to");
  }
};

export const handleNavigate = (route, params = {}) => {
  const navigation = useNavigation();

  navigation.navigate(route, params);
};

// const resetAndNavigate = (newPath) => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: typeof newPath === 'string' ? newPath : newPath.pathname, params: typeof newPath === 'object' ? newPath.params : {} }],
//     });
//   };

//   const handleGoBack = () => {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     } else {
//       console.warn('No screen to go back to');
//     }
//   };

//   const handleNavigate = (route, params = {}) => {
//     navigation.navigate(route, params);
//   };
