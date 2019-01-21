function Question(svg,width,height,x,y,number,text1,text2,text3) {
    svg
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("height", height)
        .attr("width", width)
        .attr("fill", "#d3d6d2");

    svg
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height * 3/8)
        .attr("text-anchor", "middle")
        .attr("dy", "-0.65em")
        .attr("font-size",height/10)
        .attr("class","noselect")
        .text(function () {
            return text1;
        });

    svg
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height * 3/8)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("class","noselect")
        .attr("font-size",height/10)
        .text(function () {
            return text2;
        });

    svg
        .append("text")
        .attr("x", x + width / 2)
        .attr("y", y + height * 3/8)
        .attr("text-anchor", "middle")
        .attr("dy", "1.35em")
        .attr("font-size",height/10)
        .attr("class","noselect")
        .text(function () {
            return text3;
        });

    this.button_yes = new Button(svg, width / 2, height / 4, x, y + height - height / 4, true, this,number);
    this.button_no = new Button(svg, width / 2, height / 4, x + width / 2, y + height - height / 4, false, this,number);
    this.answer = null;
}

Question.prototype.get_button = function(id){
    switch(id){
        case "0":
            return this.button_yes;
        case "1":
            return this.button_no;
    }
    return null;
};


Question.prototype.select_answer = function(id){
    switch(id){
        case "0":
            this.answer = 1;
            this.button_no.reset();
            break;
        case "1":
            this.answer = -1;
            this.button_yes.reset();
            break;
    }
    Notify_demo_new_answer();
};

function Button(svg, width, height, x, y, isYes, question,number) {
    this.question = question;
    this.isSelected = false;
    this.svg = svg;

    if(isYes){
        this.normal_color= "#7cff63";
        this.toggle_color="#36ff00";
        this.mouse_over_color="#009d02";
        text = "YES";
        this.id = number+"0";
    } else {
        this.normal_color= "#ff6d3f";
        this.toggle_color="#ff241d";
        this.mouse_over_color="#9d0100";
        text = "NO";
        this.id = number+"1";
    }

    this.button_rect = svg
        .append("rect")
        .attr("height",height)
        .attr("width",width)
        .attr("x",x)
        .attr("y",y)
        .attr("fill",this.normal_color)
        .attr("id",this.id)
        .on("click", this.click)
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut);


    svg.append("text")
        .attr("x",x + width/2)
        .attr("y",y + height/2)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("font-size",height*0.75)
        .attr("id",this.id)
        .on("mouseover", this.handleMouseOver)
        .on("click", this.click)
        .on("mouseout", this.handleMouseOut)
        .attr("class","noselect")
        .text(function () {
            return text
        });
}

Button.prototype.reset = function () {
    button = get_questions(this.id[0]).get_button(this.id[1]);
    button.button_rect.attr("fill",this.normal_color);
    button.isSelected = false;
};


Button.prototype.handleMouseOver = function() {
    button = get_questions(this.id[0]).get_button(this.id[1]);
    if(!button.isSelected) {
        button.button_rect.attr("fill", button.mouse_over_color);
    }
};

Button.prototype.handleMouseOut = function() {
    button = get_questions(this.id[0]).get_button(this.id[1]);
    if(!button.isSelected) {
        button.button_rect.attr("fill", button.normal_color);
    }
};

Button.prototype.click = function() {
    button = get_questions(this.id[0]).get_button(this.id[1]);
    button.isSelected = true;
    button.button_rect.attr("fill",button.toggle_color);
    get_questions(this.id[0]).select_answer(this.id[1]);
};
