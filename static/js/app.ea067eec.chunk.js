(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{106:function(e,n,t){"use strict";t.d(n,"a",(function(){return h}));var a=t(17),i=t.n(a),r=t(0),o=t.n(r),u=t(3),m=t(14),l=t(22),s=t(34),c=t(2),d=["Copper Ore","Iron Ore","Wood Log","Stone","Coal","Wolframite"],g=[{name:"Wood Plank",itemsPerMin:15,building:"Workshop",value:1,ingredientList:[{name:"Wood Log",amount:1}]},{name:"Wood Frame",itemsPerMin:7.5,building:"Workshop",value:4,ingredientList:[{name:"Wood Plank",amount:4}]},{name:"Copper Wire",itemsPerMin:30,building:"Workshop",value:2,ingredientList:[{name:"Copper Ingot",amount:1.5}]},{name:"Heat Sink",itemsPerMin:10,building:"Workshop",value:5,ingredientList:[{name:"Copper Ingot",amount:5}]},{name:"Iron Gear",itemsPerMin:15,building:"Workshop",value:2,ingredientList:[{name:"Iron Ingot",amount:2}]},{name:"Iron Plating",itemsPerMin:20,building:"Workshop",value:2,ingredientList:[{name:"Iron Ingot",amount:2}]},{name:"Steel Rod",itemsPerMin:15,building:"Workshop",value:35,ingredientList:[{name:"Steel",amount:3}]},{name:"Sand",itemsPerMin:40,building:"Workshop",value:1,ingredientList:[{name:"Stone",amount:1}]},{name:"Condenser Lens",itemsPerMin:20,building:"Workshop",value:12,ingredientList:[{name:"Glass",amount:3}]},{name:"Carbon Fiber",itemsPerMin:7.5,building:"Workshop",value:24,ingredientList:[{name:"Graphite",amount:4}]},{name:"Coupler",itemsPerMin:6,building:"Workshop",value:24,ingredientList:[{name:"Tungsten Carbide",amount:1}]},{name:"Iron Ingot",itemsPerMin:30,building:"Furnace",value:1,ingredientList:[{name:"Iron Ore",amount:1}]},{name:"Copper Ingot",itemsPerMin:30,building:"Furnace",value:1,ingredientList:[{name:"Copper Ore",amount:1}]},{name:"Silicone",itemsPerMin:20,building:"Furnace",value:2,ingredientList:[{name:"Sand",amount:2}]},{name:"Glass",itemsPerMin:10,building:"Furnace",value:4,ingredientList:[{name:"Sand",amount:4}]},{name:"Tungsten Ore",itemsPerMin:30,building:"Furnace",value:5,ingredientList:[{name:"Wolframite",amount:5}]},{name:"Electromagnet",itemsPerMin:7.5,building:"Machine Shop",value:14,ingredientList:[{name:"Copper Wire",amount:6},{name:"Iron Ingot",amount:2}]},{name:"Logic Circuit",itemsPerMin:10,building:"Machine Shop",value:10,ingredientList:[{name:"Copper Wire",amount:3},{name:"Silicone",amount:2}]},{name:"Metal Frame",itemsPerMin:5,building:"Machine Shop",value:12,ingredientList:[{name:"Wood Frame",amount:1},{name:"Iron Plating",amount:4}]},{name:"Battery",itemsPerMin:2.5,building:"Machine Shop",value:150,ingredientList:[{name:"Electromagnet",amount:8},{name:"Graphite",amount:8}]},{name:"Rotor",itemsPerMin:10,building:"Machine Shop",value:40,ingredientList:[{name:"Iron Plating",amount:2},{name:"Steel Rod",amount:1}]},{name:"Nano Wire",itemsPerMin:5,building:"Machine Shop",value:60,ingredientList:[{name:"Glass",amount:4},{name:"Carbon Fiber",amount:2}]},{name:"Graphite",itemsPerMin:15,building:"Forge",value:6,ingredientList:[{name:"Wood Log",amount:3},{name:"Coal",amount:3}]},{name:"Steel",itemsPerMin:7.5,building:"Forge",value:12,ingredientList:[{name:"Iron Ore",amount:6},{name:"Graphite",amount:1}]},{name:"Concrete",itemsPerMin:7.5,building:"Forge",value:40,ingredientList:[{name:"Sand",amount:10},{name:"Steel Rod",amount:1}]},{name:"Tungsten Carbide",itemsPerMin:12,building:"Forge",value:16,ingredientList:[{name:"Tungsten Ore",amount:2},{name:"Graphite",amount:1}]},{name:"Computer",itemsPerMin:7.5,building:"Industrial Factory",value:60,ingredientList:[{name:"Heat Sink",amount:3},{name:"Metal Frame",amount:1},{name:"Logic Circuit",amount:3}]},{name:"Electric Motor",itemsPerMin:3,building:"Industrial Factory",value:250,ingredientList:[{name:"Iron Gear",amount:4},{name:"Rotor",amount:2},{name:"Battery",amount:1}]},{name:"Electron Microscope",itemsPerMin:2.5,building:"Manufacturer",value:300,ingredientList:[{name:"Condenser Lens",amount:4},{name:"Electromagnet",amount:8},{name:"Metal Frame",amount:2},{name:"Nano Wire",amount:2}]},{name:"Turbocharger",itemsPerMin:4,building:"Manufacturer",value:250,ingredientList:[{name:"Iron Gear",amount:8},{name:"Logic Circuit",amount:4},{name:"Nano Wire",amount:2},{name:"Coupler",amount:4}]},{name:"Super Computer",itemsPerMin:2,building:"Manufacturer",value:250,ingredientList:[{name:"Computer",amount:2},{name:"Heat Sink",amount:8},{name:"Turbocharger",amount:1},{name:"Coupler",amount:8}]},{name:"Atomic Locator",itemsPerMin:2,building:"Manufacturer",value:250,ingredientList:[{name:"Concrete",amount:24},{name:"Copper Wire",amount:50},{name:"Electron Microscope",amount:2},{name:"Super Computer",amount:2}]},{name:"Earth Token",itemsPerMin:1.428571429,building:"Earth Transporter",value:250,ingredientList:[{name:"Matter Duplicator",amount:1}]},{name:"Energy Cube",itemsPerMin:2,building:"Machine Shop",value:250,ingredientList:[{name:"Battery",amount:2},{name:"Industrial Frame",amount:1}]},{name:"Gyroscope",itemsPerMin:5,building:"Machine Shop",value:250,ingredientList:[{name:"Copper Wire",amount:12},{name:"Rotor",amount:2}]},{name:"Industrial Frame",itemsPerMin:3,building:"Industrial Factory",value:250,ingredientList:[{name:"Concrete",amount:6},{name:"Metal Frame",amount:2},{name:"Tungsten Carbide",amount:8}]},{name:"Magnetic Field Generator",itemsPerMin:1.5,building:"Manufacturer",value:250,ingredientList:[{name:"Electromagnet",amount:10},{name:"Industrial Frame",amount:1},{name:"Nano Wire",amount:10},{name:"Stabilizer",amount:1}]},{name:"Matter Compressor",itemsPerMin:2,building:"Manufacturer",value:250,ingredientList:[{name:"Electric Motor",amount:2},{name:"Tank",amount:1},{name:"Turbocharger",amount:2},{name:"Industrial Frame",amount:1}]},{name:"Matter Duplicator",itemsPerMin:2/3,building:"Manufacturer",value:250,ingredientList:[{name:"Atomic Locator",amount:4},{name:"Energy Cube",amount:5},{name:"Particle Glue",amount:100},{name:"Quantum Entangler",amount:2}]},{name:"Particle Glue",itemsPerMin:20,building:"Workshop",value:250,ingredientList:[{name:"Matter Compressor",amount:.1}]},{name:"Quantum Entangler",itemsPerMin:1,building:"Machine Shop",value:250,ingredientList:[{name:"Magnetic Field Generator",amount:1},{name:"Stabilizer",amount:2}]},{name:"Stabilizer",itemsPerMin:2.5,building:"Industrial Factory",value:250,ingredientList:[{name:"Computer",amount:1},{name:"Electric Motor",amount:1},{name:"Gyroscope",amount:2}]},{name:"Tank",itemsPerMin:6,building:"Industrial Factory",value:250,ingredientList:[{name:"Concrete",amount:4},{name:"Glass",amount:2},{name:"Tungsten Carbide",amount:4}]}],b=t(78),p=t(18);function h(){var e=Object(r.useState)(!0),n=i()(e,2),t=n[0],a=n[1],u=Object(r.useState)("Wood Plank"),h=i()(u,2),f=h[0],L=h[1],M=Object(r.useState)(1),y=i()(M,2),I=y[0],C=y[1],S=Object(r.useState)([]),E=i()(S,2),P=E[0],k=E[1],W=Object(r.useState)(1),F=i()(W,2),T=F[0],w=F[1],O=Object(r.useState)(1),x=i()(O,2),j=x[0],N=x[1],G=Object(r.useState)(1),R=i()(G,2),D=R[0],B=R[1],A=Object(r.useState)(1),V=i()(A,2),z=V[0],H=V[1],J=Object(r.useState)(1),Q=i()(J,2),q=Q[0],K=Q[1],U=Object(r.useState)(1),X=i()(U,2),Y=X[0],Z=X[1],$=Object(r.useState)(1),_=i()($,2),ee=_[0],ne=_[1],te=Object(r.useState)([]),ae=i()(te,2),ie=ae[0],re=ae[1],oe=[],ue=[];Object(r.useEffect)((function(){oe=[],ue=[];var e=g.find((function(e){return e.name==f})),n=se(le(e.building)),t=I/e.itemsPerMin/n,a=e.building;me(f,I,0,t,a),function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=g.find((function(e){return e.name==n}));null==i||i.ingredientList.forEach((function(n){var i=n.amount*t,r=se(le("extractor")),o=Math.ceil(i/(7.5*r));if(d.includes(n.name))me(n.name,i,a,o,"Extractor");else{var u=g.find((function(e){return e.name==n.name})),m=se(le(u.building)),l=i/u.itemsPerMin/m;me(n.name,i,a,l,u.building),e(n.name,i,a+1)}}))}(f,I),k(oe),re(ue)}),[T,j,D,z,q,Y,ee,I,f]),Object(r.useEffect)((function(){oe.length}),[oe]),Object(r.useEffect)((function(){p.a.getItem("workshopLevel").then((function(e){null!=e&&w(parseInt(e))})),p.a.getItem("furnaceLevel").then((function(e){null!=e&&N(parseInt(e))})),p.a.getItem("machineShopLevel").then((function(e){null!=e&&B(parseInt(e))})),p.a.getItem("industrialFactoryLevel").then((function(e){null!=e&&H(parseInt(e))})),p.a.getItem("forgeLevel").then((function(e){null!=e&&K(parseInt(e))})),p.a.getItem("manufacturerLevel").then((function(e){null!=e&&Z(parseInt(e))})),p.a.getItem("extractorLevel").then((function(e){null!=e&&ne(parseInt(e))}))}),[]),Object(r.useEffect)((function(){p.a.setItem("workshopLevel",T.toString()),p.a.setItem("furnaceLevel",j.toString()),p.a.setItem("machineShopLevel",D.toString()),p.a.setItem("industrialFactoryLevel",z.toString()),p.a.setItem("forgeLevel",q.toString()),p.a.setItem("manufacturerLevel",Y.toString()),p.a.setItem("extractorLevel",ee.toString())}),[T,j,D,z,q,Y,ee]);var me=function(e,n,t,a,i){var r=!1;ue.forEach((function(t){t.Name==e&&(t.Amount+=n,r=!0)})),r||ue.push({Name:e,Amount:n,Building:i}),oe.push({name:e,amount:n,depth:t,numberOfBuildings:Math.ceil(a),building:i})};function le(e){switch(e.toLowerCase()){case"workshop":return T;case"furnace":return j;case"machine shop":return D;case"industrial factory":return z;case"forge":return q;case"manufacturer":return Y;case"extractor":return ee;case"earth transporter":return 1}}function se(e){switch(e){case 1:return 1;case 2:return 1.5;case 3:return 2;case 4:return 3;case 5:return 4;default:return 1}}return o.a.createElement(c.a,{style:{alignItems:"center"}},o.a.createElement(c.a,{style:{flexDirection:"row",alignItems:"center",padding:5}},o.a.createElement(m.a,{style:v.buildingLevel},"Extractor Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){ne(Number(e.replace(/[^1-5]/g,"")))},value:ee.toString()}),o.a.createElement(m.a,{style:v.buildingLevel},"Workshop Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){w(Number(e.replace(/[^1-4]/g,"")))},value:T.toString()}),o.a.createElement(m.a,{style:v.buildingLevel},"Furnace Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){N(Number(e.replace(/[^1-4]/g,"")))},value:j.toString()})),o.a.createElement(c.a,{style:{flexDirection:"row",alignItems:"center",padding:5}},o.a.createElement(m.a,{style:v.buildingLevel},"Machine Shop Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){B(Number(e.replace(/[^1-4]/g,"")))},value:D.toString()}),o.a.createElement(m.a,{style:v.buildingLevel},"Industrial Factory Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){H(Number(e.replace(/[^1-4]/g,"")))},value:z.toString()}),o.a.createElement(m.a,{style:v.buildingLevel},"Forge Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){K(Number(e.replace(/[^1-4]/g,"")))},value:q.toString()})),o.a.createElement(c.a,{style:{flexDirection:"row",alignItems:"center",padding:5}},o.a.createElement(m.a,{style:v.buildingLevel},"Manufacturer Level:"),o.a.createElement(l.a,{style:v.buildingLevelInput,keyboardType:"numeric",onChangeText:function(e){Z(Number(e.replace(/[^1-4]/g,"")))},value:Y.toString()})),o.a.createElement(c.a,{style:{alignItems:"center"}},o.a.createElement(c.a,{style:{flexDirection:"row",alignItems:"center",padding:5}},o.a.createElement(m.a,{style:{paddingRight:5}},"Items/Min"),o.a.createElement(l.a,{style:{width:75,padding:10,borderColor:"black",borderRadius:5,borderWidth:1,height:40},keyboardType:"numeric",onChangeText:function(e){C(Number(e.replace(/[^0-9]./g,"")))},value:I.toString()}),o.a.createElement(c.a,{style:{width:5}}),o.a.createElement(b.a,{style:{width:100,padding:10,borderWidth:1,borderColor:"#666",borderRadius:5,height:40},selectedValue:f,onValueChange:function(e,n){return L(e)},itemStyle:{borderColor:"red",borderWidth:2,borderRadius:5}},g.sort((function(e,n){return e.name.localeCompare(n.name)})).map((function(e){return o.a.createElement(b.a.Item,{label:e.name,value:e.name})}))))),o.a.createElement(c.a,{style:{flexDirection:"row",width:500,alignSelf:"center",justifyContent:"center"}},o.a.createElement(s.a,{style:{height:50,width:"25%",borderColor:"black",borderRadius:5,borderWidth:1,alignItems:"center",justifyContent:"center",backgroundColor:t?"#D3D3D3":"white"},onPress:function(){a(!0)}},o.a.createElement(m.a,{style:{padding:5}},"Tree View")),o.a.createElement(c.a,{style:{width:5}}),o.a.createElement(s.a,{style:{height:50,width:"25%",borderColor:"black",borderRadius:5,borderWidth:1,alignItems:"center",justifyContent:"center",backgroundColor:t?"white":"#D3D3D3"},onPress:function(){a(!1)}},o.a.createElement(m.a,{style:{padding:5}},"Summary View"))),t?o.a.createElement(c.a,{style:{alignItems:"flex-start"}},P.map((function(e){return 0==e.amount?null:o.a.createElement(m.a,{style:{paddingLeft:10*e.depth}},e.amount," ",e.name," (",e.numberOfBuildings," ",e.building,")")}))):o.a.createElement(c.a,{style:{alignItems:"flex-start"}},ie.sort((function(e,n){return e.Name.localeCompare(n.Name)})).map((function(e){var n=0;n=d.includes(e.Name)?7.5:g.find((function(n){return n.name==e.Name})).itemsPerMin;var t=se(le(e.Building)),a=e.Amount/n/t;return o.a.createElement(m.a,null,e.Name,": ",e.Amount," (",Math.ceil(a)," ",e.Building,")")}))),o.a.createElement(c.a,{style:{height:50}}))}var v=u.a.create({container:{width:"100%",height:"50%",flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center",paddingBottom:30},buildingLevel:{paddingLeft:15,paddingRight:2},buildingLevelInput:{width:30,padding:5,borderColor:"black",borderRadius:5,borderWidth:1,height:30}})},107:function(e,n,t){e.exports=t(135)}},[[107,1,2]]]);
//# sourceMappingURL=app.ea067eec.chunk.js.map