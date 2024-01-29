(()=>{var e=wp.blocks.registerBlockType,t=wp.blockEditor,a=t.InnerBlocks,n=t.InspectorControls,o=t.ColorPalette,r=t.MediaUpload,l=wp.components,c=l.PanelBody,u=l.Button,i=l.SelectControl,g=wp.i18n.__;e("zetkin/custom-hero03",{title:"Zetkin Custom Hero 03",category:"zetkin/custom",attributes:{backgroundColor:{type:"string",default:"#888888"},backgroundImage:{type:"string",default:""},backgroundPosition:{type:"string",default:"center center"},backgroundSize:{type:"string",default:"cover"},backgroundRepeat:{type:"string",default:"no-repeat"}},edit:function(e){var t=e.attributes,l=t.backgroundColor,d=t.backgroundImage,b=t.backgroundPosition,p=t.backgroundSize,k=t.backgroundRepeat,s=e.setAttributes;return React.createElement(React.Fragment,null,React.createElement(n,null,React.createElement(c,{title:"Background Color Settings",initialOpen:!0},React.createElement(o,{value:l,onChange:function(e){s({backgroundColor:e})}}),React.createElement("p",null,g("Background Image","text-domain")),React.createElement(r,{onSelect:function(e){s({backgroundImage:e.url})},allowedTypes:["image"],value:d,render:function(e){var t=e.open;return React.createElement(u,{onClick:t,isDefault:!0,isLarge:!0},g(d?"Change Image":"Select Image","text-domain"))}}),React.createElement(i,{label:"Background Position",value:b,options:[{label:"Center Center",value:"center center"},{label:"Top Left",value:"top left"},{label:"Top Center",value:"top center"}],onChange:function(e){s({backgroundPosition:e})}}),React.createElement(i,{label:"Background Size",value:p,options:[{label:"Cover",value:"cover"},{label:"Contain",value:"contain"},{label:"Auto",value:"auto"}],onChange:function(e){s({backgroundSize:e})}}),React.createElement(i,{label:"Background Repeat",value:k,options:[{label:"No Repeat",value:"no-repeat"},{label:"Repeat",value:"repeat"},{label:"Repeat X",value:"repeat-x"},{label:"Repeat Y",value:"repeat-y"}],onChange:function(e){s({backgroundRepeat:e})}}))),React.createElement("div",{className:"wp-block-cover zetkin-pattern--hero03",style:{backgroundColor:l,backgroundImage:d?"url(".concat(d,")"):"none",backgroundPosition:b,backgroundSize:p,backgroundRepeat:k}},React.createElement(a,{allowedBlocks:["core/heading","core/paragraph"],template:[["core/heading",{placeholder:"Enter heading..."}],["core/paragraph",{placeholder:"Enter text..."}]]})))},save:function(e){var t=e.attributes,n=t.backgroundColor,o=t.backgroundImage,r=t.backgroundPosition,l=t.backgroundSize,c=t.backgroundRepeat;return React.createElement("div",{className:"wp-block-cover zetkin-pattern--hero",style:{backgroundColor:n,backgroundImage:o?"url(".concat(o,")"):"none",backgroundPosition:r,backgroundSize:l,backgroundRepeat:c}},React.createElement(a.Content,null))}})})();