"use strict";(self.webpackChunkbest=self.webpackChunkbest||[]).push([[912],{4912:function(r,e,s){s.r(e),s.d(e,{default:function(){return m}});var a=s(3531),t=s(7689),l=s(1413),c=s(2791),o=s(9195),i=s(184),n=function(r){var e=r.login,s=r.captcha,a=r.serverErrors,t=(0,o.cI)({defaultValues:{email:"",password:"",captcha:""}}),n=t.register,u=t.handleSubmit,d=t.setError,m=t.clearErrors,h=t.formState.errors;(0,c.useEffect)((function(){a&&d("_form",{type:"server side",message:a[0]})}),[a]);return(0,i.jsxs)("form",{className:"flex flex-col items-start",onSubmit:u((function(r){e(r)})),children:[h._form&&(0,i.jsxs)("div",{className:"text-red-700 mb-2",children:["Error: ",h._form.message]}),(0,i.jsxs)("div",{className:"mb-2 flex w-full",children:[(0,i.jsx)("label",{className:"mr-2",children:"E-mail:"}),(0,i.jsx)("input",(0,l.Z)({className:"flex-auto border-b-2",type:"text",placeholder:"e-mail"},n("email")))]}),(0,i.jsxs)("div",{className:"mb-2 flex w-full",children:[(0,i.jsx)("label",{className:"mr-2",children:"Password:"}),(0,i.jsx)("input",(0,l.Z)({className:"flex-auto border-b-2",type:"password",placeholder:"password"},n("password")))]}),s&&(0,i.jsxs)("div",{className:"mb-2",children:[(0,i.jsx)("div",{className:"border-2 border-red-700 inline-flex",children:(0,i.jsx)("img",{src:s,alt:""})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{className:"",children:"Enter the characters from the picture:"}),(0,i.jsx)("input",(0,l.Z)({className:"w-full border-b-2",type:"text",placeholder:"captcha"},n("captcha")))]})]}),(0,i.jsx)("button",{className:"border-2 py-1 px-5 rounded-[10px]",onClick:function(){return m("_form")},type:"submit",children:"Login"})]})},u=function(r){var e=r.login,s=r.isAuth,a=r.captcha,l=r.serverErrors;return s?(0,i.jsx)(t.Fg,{to:"/profile"}):(0,i.jsxs)("div",{className:"text-start p-4",children:[(0,i.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"Login"}),(0,i.jsx)(n,{serverErrors:l,login:e,captcha:a})]})},d=s(272),m=(0,a.$j)((function(r){return{isAuth:r.authMe.isAuth,captcha:r.authMe.captcha,serverErrors:r.authMe.form.errors}}),{login:d.x4,setFormError:d.Nw.setFormErrors})((function(r){var e=r.login,s=r.isAuth,a=r.captcha,t=r.serverErrors,l=r.setFormError;return(0,c.useEffect)((function(){l(null)}),[]),(0,i.jsx)(u,{serverErrors:t,login:e,captcha:a,isAuth:s})}))}}]);
//# sourceMappingURL=912.efb57a6e.chunk.js.map