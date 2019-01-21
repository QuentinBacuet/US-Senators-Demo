function Senator(svg,width,height,x,y) {
    svg
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("height", height)
        .attr("width", width)
        .attr("fill", "#dee1dd");

    var ratio = 0.9;

    this.img = svg
        .append("svg:image")
        .attr("x", x)
        .attr("y", y)
        .attr("height", height * ratio)
        .attr("width", width)
        .attr("fill", "#a50e1d");

    svg
        .append("rect")
        .attr("x", x)
        .attr("y", y + + height * ratio)
        .attr("height", height * (1-ratio))
        .attr("width", width)
        .attr("fill", "#dee1dd");

    this.text = svg
        .append("text")
        .attr("x",x + width /2 )
        .attr("y",y + height * ratio + height * (1-ratio)/2)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("font-size",height/12)
        .attr("class","noselect")

}

Senator.prototype.SetFace = function(name,id,party) {
    this.img.attr("xlink:href", "data/Faces/"+id);
    this.text.text(function () {
        return name + " (" +party +")"
    });
};