import LoginPage from "./src/pages/login-page/login-page";
import render from "./src/utils/render";

// const template = `
// <div id='hoho'></div>
// `;

// class MyApp extends BaseComponent {
//   constructor() {
//     super("fragment", {
//       children: {
//         hoho: new LoginPage(),
//       },
//     });
//   }

//   render() {
//     const tpl = compile(template, { noEscape: true });
//     return tpl(null);
//   }
// }

// const page = new FormField({
//   id: "hihi",
//   name: "dmdmd",
//   label: "lable",
//   events: {
//     focus: () => {
// //       console.log(this);
// //     },
// //   },
// // });

// const button = new Button(
//   {
//     caption: "meme",
//     events: {
//       click: () => console.log("click"),
//     },
//   },
//   {
//     disabled: "true",
//     type: "button",
//   }
// );

// const input = new Input({
//   id: "sdfsdf",
//   name: "sdfad",
//   isRequired: true,
//   events: {
//     input: () => {
//       console.log("input");
//     },
//   },
// });
// button.setProps({ caption: "prep" });
// setTimeout(() => button.setProps({ caption: "newCaption" }), 2000);
// setTimeout(() => {
//   button._setAttributes({
    
//   });
// }, 3000);
// const button = new Button({ type: "button", caption: "btn", events: { click: () => alert("it's work!") } });
const page = new LoginPage();
render("#app", page);
