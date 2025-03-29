const languages = {
  en: {
    languageSelection: "Language Selection",
    topics: [
      {
        title: "What is React Native?",
        description:
          "React Native is an open-source framework for building mobile applications using JavaScript and React."
      },
      {
        title: "What is a Higher-Order Function?",
        description:
          "A higher-order function is a function that takes another function as an argument or returns a function as its output."
      },
      {
        title: "What is Redux and how does it work?",
        description:
          "Redux is a predictable state management library for JavaScript applications. It maintains a single store and updates state through actions and reducers."
      },
      {
        title: "Explain the Virtual DOM in React.",
        description:
          "The Virtual DOM is a lightweight copy of the actual DOM. React updates the Virtual DOM first, then applies efficient updates to the real DOM."
      },
      {
        title: "What are Promises in JavaScript?",
        description:
          "A Promise represents the eventual completion (or failure) of an asynchronous operation and allows chaining with `.then()` and `.catch()` methods."
      },
      {
        title: "What is the difference between useState and useReducer?",
        description:
          "useState is a simple state management hook, while useReducer is used for managing complex state logic in React components."
      },
      {
        title: "What are React Hooks?",
        description:
          "Hooks are functions that allow functional components to use state and lifecycle features without writing a class component."
      },
      {
        title: "What is Closure in JavaScript?",
        description:
          "A closure is a function that retains access to variables from its outer scope, even after the outer function has executed."
      },
      {
        title: "What is Debouncing and Throttling?",
        description:
          "Debouncing limits the rate of function execution by delaying it, while throttling ensures a function is called at most once in a given time frame."
      },
      {
        title: "What is Memoization in React?",
        description:
          "Memoization is an optimization technique that stores the results of expensive function calls and reuses the cached result when the same inputs occur again."
      }
    ]
  },
  hi: {
    languageSelection: "भाषा चयन",
    topics: [
      {
        title: "React Native क्या है?",
        description:
          "React Native एक ओपन-सोर्स फ्रेमवर्क है जो JavaScript और React का उपयोग करके मोबाइल ऐप्लिकेशन बनाने के लिए उपयोग किया जाता है।"
      },
      {
        title: "Higher-Order Function क्या है?",
        description:
          "Higher-Order Function वह function होता है जो किसी अन्य function को argument के रूप में लेता है या एक function को return करता है।"
      },
      {
        title: "Redux क्या है और यह कैसे काम करता है?",
        description:
          "Redux एक state management लाइब्रेरी है जो एक single store का उपयोग करती है और actions और reducers के माध्यम से state अपडेट करती है।"
      },
      {
        title: "React में Virtual DOM क्या है?",
        description:
          "Virtual DOM असली DOM की एक हल्की कॉपी होती है। React पहले Virtual DOM को अपडेट करता है, फिर वास्तविक DOM में आवश्यक बदलाव लागू करता है।"
      },
      {
        title: "JavaScript में Promises क्या होते हैं?",
        description:
          "Promise एक asynchronous operation के पूर्ण होने (या असफलता) का प्रतिनिधित्व करता है और `.then()` और `.catch()` के साथ chaining की अनुमति देता है।"
      },
      {
        title: "useState और useReducer में क्या अंतर है?",
        description:
          "useState एक साधारण state management hook है, जबकि useReducer जटिल state logic को प्रबंधित करने के लिए उपयोग किया जाता है।"
      },
      {
        title: "React Hooks क्या होते हैं?",
        description:
          "Hooks वे functions हैं जो functional components को state और lifecycle features का उपयोग करने की अनुमति देते हैं।"
      },
      {
        title: "JavaScript में Closure क्या है?",
        description:
          "Closure एक function है जो अपने बाहरी scope के variables को retain करता है, भले ही बाहरी function execute हो गया हो।"
      },
      {
        title: "Debouncing और Throttling क्या हैं?",
        description:
          "Debouncing function execution को delay करता है, जबकि Throttling एक निर्धारित समय सीमा में केवल एक बार function को call करने की अनुमति देता है।"
      },
      {
        title: "React में Memoization क्या है?",
        description:
          "Memoization एक optimization तकनीक है जो महंगे function calls के परिणामों को cache करती है और समान inputs के लिए cached परिणाम का पुनः उपयोग करती है।"
      }
    ]
  },
  od: {
    languageSelection: "ଭାଷା ବିକଳ୍ପ",
    topics: [
      {
        title: "React Native କ'ଣ?",
        description:
          "React Native ଏକ open-source framework ଅଟେ ଯେଉଁଥିରେ JavaScript ଏବଂ React ବ୍ୟବହାର କରି ମୋବାଇଲ ଆପ୍ଲିକେସନ୍ ନିର୍ମାଣ କରାଯାଏ।"
      },
      {
        title: "Higher-Order Function କ'ଣ?",
        description:
          "Higher-Order Function ଏହି function ଅଟେ ଯେଉଁଥି ଅନ୍ୟ function କୁ argument ଭାବରେ ଗ୍ରହଣ କରେ କିମ୍ବା ଏକ function କୁ return କରେ।"
      },
      {
        title: "Redux କ'ଣ ଏବଂ ଏହା କିପରି କାମ କରେ?",
        description:
          "Redux ଏକ state management library ଅଟେ ଯାହା single store ବ୍ୟବହାର କରି state update କରିଥାଏ actions ଏବଂ reducers ଦ୍ଵାରା।"
      },
      {
        title: "React ର Virtual DOM କ'ଣ?",
        description:
          "Virtual DOM ଏକ lightweight copy ଅଟେ ଯାହା original DOM ର। React ପ୍ରଥମେ Virtual DOM କୁ update କରେ, ତାପରେ ବାସ୍ତବ DOM ରେ ଦରକାରୀ ପରିବର୍ତ୍ତନ କରେ।"
      },
      {
        title: "JavaScript ର Promises କ'ଣ?",
        description:
          "Promise ଏକ asynchronous operation ର ଫଳାଫଳ (ସଫଳତା କିମ୍ବା ବିଫଳତା) ଦର୍ଶାଏ ଏବଂ `.then()` ଏବଂ `.catch()` ସହିତ chaining କରିପାରିବ।"
      },
      {
        title: "useState ଏବଂ useReducer ର ତ୍ଯାନ୍ତ୍ର ଅଟେ?",
        description:
          "useState ଏକ ସାଧାରଣ state management hook ଅଟେ, ଯେଉଁଥି useReducer ଜଟିଳ state logic ପାଇଁ ବ୍ୟବହାର କରାଯାଏ।"
      },
      {
        title: "React Hooks କ'ଣ?",
        description:
          "Hooks ଏହି function ଅଟେ ଯେଉଁଥି functional components କୁ state ଏବଂ lifecycle features ବ୍ୟବହାର କରିପାରିବ।"
      },
      {
        title: "JavaScript ର Closure କ'ଣ?",
        description:
          "Closure ଏହି function ଅଟେ ଯେଉଁଥି ଏହାର ବାହାରିଲା scope ର variables କୁ retain କରେ।"
      },
      {
        title: "Debouncing ଏବଂ Throttling କ'ଣ?",
        description:
          "Debouncing ଏକ function execution କୁ delay କରେ, ଯେଉଁଥି Throttling ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ ସମୟ ମଧ୍ଯରେ କେବଳ ଏକ function call ଦେଇଥାଏ।"
      },
      {
        title: "React ର Memoization କ'ଣ?",
        description:
          "Memoization ଏକ optimization ଟେକନିକ ଅଟେ ଯେଉଁଥି ଏକ ଅତ୍ୟଧିକ ଖର୍ଚ୍ଚ ସମୟ ସପେକ୍ଷ function call ର ପରିଣାମ କୁ cache କରିଥାଏ।"
      }
    ]
  }
};

export default languages;
