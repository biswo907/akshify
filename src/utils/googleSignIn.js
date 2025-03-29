import {
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin";

export const signIn = async () => {
  console.log("CALLEDDDDDDDDDDDDDDDDDD");

  try {
    await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
    const response = await GoogleSignin.signIn(); // Sign in request

    if (response && response.user) {
      console.log("USER INFO____", response.user); // Log user info
    } else {
      console.log("Signin Canceled"); // Sign-in was cancelled
    }
  } catch (error) {
    console.log("Google Sign-In Error:", error); // Log the full error for debugging

    if (error.code) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          console.log("Signing in is already in progress...");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Google Play Services are not available or outdated.");
          break;
        default:
          console.log("Some other error occurred:", error.message);
      }
    } else {
      console.log("An unknown error occurred:", error);
    }
  }
};
