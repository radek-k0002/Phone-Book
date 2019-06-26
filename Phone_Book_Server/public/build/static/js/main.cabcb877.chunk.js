(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,a){e.exports=a(40)},30:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),r=a(22),o=a.n(r),c=(a(30),a(10)),i=a(11),l=a(15),d=a(12),m=a(2),h=a(3),u=a(5),p=a(4),f=a(6),g=function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{style:this.props.style,className:this.props.className},this.props.message)}}]),t}(s.Component),v={width:"70%",margin:"0 auto 20px auto","font-size":"14px",color:"#b31622","text-align":"center"},E=function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={email:"",password:"",repeatedPassword:"",checkbox:!1,errors:{email:"Email is invalid",password:"Password is to short (min 4 characters)",repeatedPassword:"You need to fill the field",checkbox:"You need to accept statements"},unexpectError:"Oops! Something went wrong. Try again later.",emailValid:!1,passwordValid:!1,repeatedPasswordValid:!1,checkboxValid:!1,formValid:!1,loadErrors:!1,loadUnexpectedError:!1},a.handleChange=function(e){var t=e.target,s=t.name,n=t.value;a.setState(Object(d.a)({},s,n),function(){a.validateField(t,s,n)})},a.validateField=function(e,t,s){var n=a.state.errors,r=a.state.emailValid,o=a.state.passwordValid,c=a.state.repeatedPasswordValid,i=a.state.checkboxValid;switch(t){case"email":r=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s),n.email=r?"":"E-mail is invalid";break;case"password":o=s.length>=4,n.password=o?"":"Password is to short",c=a.state.password===a.state.repeatedPassword,n.repeatedPassword=c?"":"Passwords are not the same";break;case"repeatedPassword":c=a.state.password===a.state.repeatedPassword,n.repeatedPassword=c?"":"Passwords are not the same",""===a.state.repeatedPassword&&(n.repeatedPassword=c?"":"You need to fill the field");break;case"checkbox":i=e.checked,n.checkbox=i?"":"You need to accept statements"}a.setState({errors:n,emailValid:r,passwordValid:o,repeatedPasswordValid:c,checkboxValid:i},a.validateForm)},a.validateForm=function(){a.setState({formValid:a.state.emailValid&&a.state.passwordValid&&a.state.repeatedPasswordValid&&a.state.checkboxValid})},a.handleSubmit=function(e){if(e.preventDefault(),a.validateForm(),!1!==a.state.formValid){var t={email:a.state.email,password:a.state.password,repeatedPassword:a.state.repeatedPassword,checkbox:a.state.checkboxValid};fetch("/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(e){e.errors?function(){var t=e.errors,s=function(e){switch(e){case"email":a.setState(function(a){return{errors:Object(l.a)({},a.errors,{email:t[e]}),emailValid:!1}});break;case"password":a.setState(function(a){return{errors:Object(l.a)({},a.errors,{password:t[e]}),passwordValid:!1}});break;case"repeatedPassword":a.setState(function(a){return{errors:Object(l.a)({},a.errors,{repeatedPassword:t[e]}),repeatedPasswordValid:!1}});break;case"checkbox":a.setState(function(a){return{errors:Object(l.a)({},a.errors,{checkbox:t[e]}),checkboxValid:!1}})}a.setState({loadErrors:!0})};for(var n in t)s(n)}():"ok"===e.status?a.props.history.push("/sign_in"):a.setState({loadUnexpectedError:!0})})}else a.setState({loadErrors:!0})},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"sign-up-container"},n.a.createElement("div",{className:"left"},n.a.createElement("div",{className:"page-switcher"},n.a.createElement(c.b,{exact:!0,to:"/",activeClassName:"page-switcher-active",className:"page-switcher-item"},"Sign up"),n.a.createElement("div",{className:"ps-or"},"||"),n.a.createElement(c.b,{to:"/sign_in",activeClassName:"page-switcher-active",className:"page-switcher-item"},"Sign in")),n.a.createElement("input",{type:"email",name:"email",placeholder:"E-mail",maxLength:"255",onChange:this.handleChange}),this.state.loadErrors?n.a.createElement(g,{className:"error",message:this.state.errors.email}):null,n.a.createElement("input",{type:"password",name:"password",placeholder:"Password",maxLength:"255",onChange:this.handleChange}),this.state.loadErrors?n.a.createElement(g,{className:"error",message:this.state.errors.password}):null,n.a.createElement("input",{type:"password",name:"repeatedPassword",placeholder:"Retype Password",maxLength:"255",onChange:this.handleChange}),this.state.loadErrors?n.a.createElement(g,{className:"error",message:this.state.errors.repeatedPassword}):null,n.a.createElement("div",{className:"checkbox-container"},n.a.createElement("input",{type:"checkbox",name:"checkbox",onChange:this.handleChange}),n.a.createElement("p",{className:"statement"},"I agree all statements"),this.state.loadErrors?n.a.createElement(g,{className:"checkbox-error",message:this.state.errors.checkbox}):null),n.a.createElement("button",{type:"submit",name:"submit",onClick:this.handleSubmit},"Sign up"),this.state.loadUnexpectedError?n.a.createElement(g,{style:v,message:this.state.unexpectError}):null)))}}]),t}(s.Component),b={width:"70%",margin:"0 auto 20px auto",fontSize:"14px",color:"#b31622",textAlign:"center"},w=function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={email:"",password:"",error:"",loadErrors:!1},a.handleChange=function(e){var t=e.target,s=t.name,n=t.value;a.setState(Object(d.a)({},s,n))},a.handleSubmit=function(e){e.preventDefault();var t={email:a.state.email,password:a.state.password};fetch("/sign_in",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(function(e){return e.json()}).then(function(e){"failure"===e.status?a.setState({error:"The email or password doesn't match any account",loadErrors:!0}):"ok"===e.status?(a.setState({loadErrors:!1}),a.props.history.push("/contacts")):a.setState({error:"Oops! Something went wrong. Try again later.",loadErrors:!0})})},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"sign-up-container"},n.a.createElement("div",{className:"left"},n.a.createElement("div",{className:"page-switcher"},n.a.createElement(c.b,{exact:!0,to:"/",activeClassName:"page-switcher-active",className:"page-switcher-item"},"Sign up"),n.a.createElement("div",{className:"ps-or"},"||"),n.a.createElement(c.b,{to:"/sign_in",activeClassName:"page-switcher-active",className:"page-switcher-item"},"Sign in")),n.a.createElement("input",{type:"email",name:"email",placeholder:"E-mail",maxLength:"255",value:this.state.email,onChange:this.handleChange}),n.a.createElement("input",{type:"password",name:"password",placeholder:"Password",maxLength:"255",value:this.state.password,onChange:this.handleChange}),n.a.createElement("button",{onClick:this.handleSubmit,type:"submit",name:"submit"},"Sign In"),this.state.loadErrors?n.a.createElement(g,{style:b,message:this.state.error}):null)))}}]),t}(s.Component),y=(a(35),function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={},a.logout=function(){fetch("http://localhost:4000/logout",{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){"logout"===e.status&&a.props.history.push("/sign_in")})},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("header",null,n.a.createElement("div",null,n.a.createElement("div",{className:"searchContainer"},n.a.createElement("input",{onChange:this.props.search,className:"search",type:"search",placeholder:"Search"})),n.a.createElement("div",{className:"logOut",onClick:this.props.logout},n.a.createElement("i",{className:"fas fa-sign-out-alt"}))))}}]),t}(s.Component)),N=(a(36),function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={},a.add=function(){var e=document.getElementById("contactForm"),t=document.getElementById("submit");t.classList.add("add"),t.innerHTML="Add Contact",e.classList.toggle("active")},a.edit=function(){var e=document.getElementById("contactForm"),t=document.getElementById("submit");t.classList.add("edit"),t.innerHTML="Edit Contact",e.classList.toggle("active")},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("main",null,n.a.createElement("div",{className:"contacts"},n.a.createElement("div",{className:"addUser"},n.a.createElement("i",{onClick:this.props.add,className:"fas fa-plus"})),this.props.contacts.map(function(t){return n.a.createElement("div",{className:"contactContainer","data-id":t.id,key:t.id},n.a.createElement("i",{className:"fas fa-user"}),n.a.createElement("div",{className:"contact"},n.a.createElement("div",{className:"name"},t.name),n.a.createElement("div",{className:"notes"},t.notes),n.a.createElement("div",{className:"phone"},t.phone)),n.a.createElement("div",{className:"icons-container"},n.a.createElement("i",{onClick:e.props.edit,className:"fas fa-user-edit"}),n.a.createElement("i",{onClick:e.props.delete,className:"fas fa-trash-alt"})))})))}}]),t}(s.Component)),C=(a(37),function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).close=function(){var e=document.getElementById("contactForm");document.getElementById("submit").classList.remove("add","edit"),e.classList.remove("active")},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{id:"contactForm"},n.a.createElement("i",{onClick:this.close,className:"fas fa-times"}),n.a.createElement("div",{className:"fields"},n.a.createElement("div",{className:"nameField"},n.a.createElement("i",{className:"fas fa-user-plus"}),n.a.createElement("input",{onChange:this.props.name,value:this.props.nameValue,maxLength:"20",className:"name",type:"text",placeholder:"Name"})),n.a.createElement("div",{className:"notesField"},n.a.createElement("i",{className:"far fa-sticky-note"}),n.a.createElement("input",{onChange:this.props.notes,value:this.props.notesValue,maxLength:"40",className:"notes",type:"text",placeholder:"Notes"})),n.a.createElement("div",{className:"phoneField"},n.a.createElement("i",{className:"fas fa-phone-alt"}),n.a.createElement("input",{onChange:this.props.phone,value:this.props.phoneNumber,maxLength:"15",className:"phone",type:"text",placeholder:"Add Contact"===this.props.status?"Phone Number*":"Phone Number"}))),n.a.createElement("button",{onClick:this.props.submitForm,id:"submit",className:"submit",type:"submit"},this.props.status))}}]),t}(s.Component)),j=(a(38),function(e){function t(){var e,a;Object(m.a)(this,t);for(var s=arguments.length,n=new Array(s),r=0;r<s;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(n)))).state={contacts:[],name:"",surename:"",notes:"",phone:"",filteredUsers:[],status:"Add Contact",editID:"",showUnexpError:!1},a.search=function(e){var t=e.target.value.toLowerCase(),s=a.state.contacts,n=[];s.map(function(e){(e.name.toLowerCase().includes(t)||e.notes.toLowerCase().includes(t)||e.phone.toLowerCase().includes(t))&&n.push(e)}),a.setState({filteredUsers:n})},a.logout=function(){fetch("/logout",{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){"logout"===e.status?a.props.history.push("/sign_in"):a.setState({showUnexpError:!0})})},a.hideUnexpError=function(){a.setState({showUnexpError:!1})},a.delete=function(e){var t=e.target.parentNode.parentNode.dataset.id,s=a.state.contacts;fetch("/contacts/".concat(t),{method:"DELETE",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){if("ok"===e.status){for(var n=0;n<s.length;n++)if(s[n].id===parseInt(t)){s.splice(n,1),a.setState({contacts:s});break}}else a.setState({showUnexpError:!0})})},a.add=function(){var e=document.getElementById("contactForm");a.setState({name:"",notes:"",phone:"",status:"Add Contact"}),e.classList.toggle("active")},a.edit=function(e){var t=document.getElementById("contactForm");a.setState({name:"",notes:"",phone:"",status:"Edit Contact",editID:e.target.parentNode.parentNode.dataset.id}),t.classList.toggle("active")},a.getName=function(e){a.setState({name:e.target.value})},a.getNotes=function(e){a.setState({notes:e.target.value})},a.getPhone=function(e){document.querySelector("input.phone").classList.remove("errorRequired");(e.target.value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/)||""===e.target.value)&&a.setState({phone:e.target.value})},a.submitForm=function(e){var t=a.state,s=t.name,n=t.notes,r=t.phone,o=t.contacts;if("Add Contact"===a.state.status){var c=0,i=document.querySelector("input.phone");if(""!==r){o.map(function(e){e.id>c&&(c=e.id)});var l={id:c+1,name:s,notes:n,phone:r};fetch("/contacts/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}).then(function(e){return e.json()}).then(function(e){"ok"===e.status?(i.classList.remove("errorRequired"),a.setState({contacts:e.contacts}),document.getElementById("contactForm").classList.toggle("active")):a.setState({showUnexpError:!0})})}else i.classList.add("errorRequired")}else if("Edit Contact"===a.state.status){var d={},m=document.getElementById("contactForm");o.some(function(e){if(e.id===parseInt(a.state.editID)){var t=o.indexOf(e);if(Object.keys(d).length>0)return!1;""!==s&&(d.name=s,o[t].name=s),""!==n&&(d.notes=n,o[t].notes=n),""!==r&&(d.phone_number=r,o[t].phone=r)}}),Object.keys(d).length>0?fetch("/contacts/".concat(a.state.editID),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then(function(e){return e.json()}).then(function(e){"ok"===e.status?a.setState({contacts:o}):a.setState({showUnexpError:!0}),m.classList.toggle("active")}):m.classList.toggle("active")}},a}return Object(f.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/getContacts",{method:"POST",headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(t){if("ok"===t.status){var a=t.contacts;e.setState({contacts:a})}else e.setState({showUnexpError:!0})}),setInterval(function(){fetch("/contacts/refresh",{method:"POST"})},6e4)}},{key:"render",value:function(){return n.a.createElement("div",{onClick:this.hideUnexpError},n.a.createElement(y,{search:this.search,logout:this.logout}),n.a.createElement(N,{contacts:this.state.filteredUsers.length>0?this.state.filteredUsers:this.state.contacts,delete:this.delete,add:this.add,edit:this.edit}),n.a.createElement(C,{submitForm:this.submitForm,status:this.state.status,name:this.getName,nameValue:this.state.name,notes:this.getNotes,notesValue:this.state.notes,phone:this.getPhone,phoneNumber:this.state.phone}),this.state.showUnexpError?n.a.createElement("div",{className:"unexpectedErrorDiv"},"Oops! Something went wrong. Refresh the page and try again."):null)}}]),t}(s.Component));a(39);var k=function(){return n.a.createElement(c.a,null,n.a.createElement(i.a,{exact:!0,path:"/",component:E}),n.a.createElement(i.a,{path:"/sign_in",component:w}),n.a.createElement(i.a,{path:"/contacts",component:j}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[25,1,2]]]);
//# sourceMappingURL=main.cabcb877.chunk.js.map