const template = document.createElement("template"); 
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma-rtl.min.css">
<link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
<div class="box">
<blockquote> 
<button class="delete is-right" id="achievement-delete" ></button>
  <div class="columns is-gapless">
    <div class="column is-1">
      <span class="fa-stack fa-2x">
        <i class="fa fa-circle-thin fa-stack-2x has-text-grey"></i>
        <i class="fa fa-trophy fa-stack-1x has-text-grey"></i>
      </span>
    </div>

    <div class="column">
      <p id="description">
        <h4 id="title">???</h4>
        <br>
      </p>
    </div>
  </div> 
</blockquote>
</div>
`; 



class WCAchievement extends HTMLElement{
    constructor(){
        super(); 
        this.attachShadow({mode:"open"}); 
        this.shadowRoot.appendChild(template.content.cloneNode(true)); 
    }

    connectedCallback()
}

