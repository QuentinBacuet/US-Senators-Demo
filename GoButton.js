var disabled_color = "#565856";
var normal_color = "#fbf8ff";
var mouse_over_color = "#d3d6d2";

function GoButton(svg,go_button_height,questions_width,questions_height) {
    this.goButton = svg
        .append("rect")
        .attr("height",go_button_height)
        .attr("width",questions_width)
        .attr("x",0)
        .attr("y",questions_height)
        .attr("fill",disabled_color)
        .style("opacity", 0.5);

    this.text = svg
        .append("text")
        .attr("x",questions_width / 2)
        .attr("y",questions_height + go_button_height/2)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("font-size",questions_height/20)
        .attr("class","noselect")
        .text(function () {
        return "Go"
        });
}

GoButton.prototype.enable = function () {
    this.goButton.on("click", this.click)
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut);

    this.text.on("click", this.click)
        .on("mouseover", this.handleMouseOver)
        .on("mouseout", this.handleMouseOut);

    this.goButton.attr("fill",normal_color)
};

GoButton.prototype.click = function() {
    add_new_node();
    get_go_button().goButton.attr("fill",disabled_color);
    get_go_button().goButton.on("click",function () {});
    get_go_button().goButton.on("mouseover",function () {});
    get_go_button().goButton.on("mouseout",function () {})
};

GoButton.prototype.handleMouseOver = function() {
    get_go_button().goButton.attr("fill",mouse_over_color)
};

GoButton.prototype.handleMouseOut = function() {
    get_go_button().goButton.attr("fill",normal_color)
};