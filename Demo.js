var width = 1500, height = 750;

var svg = d3
    .select("div#container")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + width + " " + height)
    .classed("svg-content", true)
    .attr("class", "unfocusable")
    .attr("display", "inline-block");

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#f2f2f2");

var force = d3.layout.force()
    .charge(-500)
    .linkDistance(75)
    .gravity(0.9)
    .size([width, height])
    .on("tick", tick);

var nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

rep_color = "#b40006"
dem_color = "#1b00b4"
indp_color = "#00b439"
you_color = "#ffff00"

restart();

d3.csv("data/adjacency_full.csv", function (adjacency) {
    d3.csv("data/senators_full.csv", function (senators) {

        size = senators.length;

        for (var i = 0; i < size; i++) {
            nodes.push({
                "name": senators[i]["name"],
                "party": senators[i]["party"]})
        }

        for (i = 0; i < size; i++) {
            for (var j = i; j < size; j++) {
                if (adjacency[i][j] > 0) {
                    links.push({
                        "source": i,
                        "target": j,
                        "weight": adjacency[i][j]
                    })
                }
            }
        }

        restart();

        link_list_size =  links.length;
    });
});

function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}


function init() {
    var go_button_height = height / 10;
    var spacing = 0.85;
    var questions_width = width / 4;
    var question_width = questions_width * spacing;
    var question_x = questions_width * (1 - spacing) / 2;
    var questions_height = height - go_button_height;
    var question_height = questions_height / 3 * spacing;
    var question_y = questions_height / 3 * (1 - spacing);

    goButton = new GoButton(svg, go_button_height, questions_width, questions_height);

    var questions = svg
        .append("rect")
        .attr("height", questions_height)
        .attr("width", questions_width)
        .attr("fill", "#d3d6d2")
        .style("opacity", 0.5);

    question_1 = new Question(svg, question_width, question_height, question_x, question_y / 2, "0", "Impose sanctions against any", "personhelp Iran’s ballistic", " missile program");
    question_2 = new Question(svg, question_width, question_height, question_x, question_y * 1.5 + question_height, "1", "$606.5 billion for the", "Departmentof Defense budget", "for the 2019 year");
    question_3 = new Question(svg, question_width, question_height, question_x, question_y * 2.5 + question_height * 2, "2", "Disapprove a rule that attempted ", "to reduce the environmental", " impact of coal mining");

    questions_list = [];
    questions_list.push(question_1);
    questions_list.push(question_2);
    questions_list.push(question_3);

    var prediction_height = height / 8;
    var senators_width = width / 4;
    var senator_width = senators_width * spacing;
    var senator_x = senators_width * (1 - spacing) / 2 + width - senators_width;
    var senators_height = height - prediction_height;
    var senator_height = senators_height / 2 * spacing;
    var senator_y = senators_height / 2 * (1 - spacing);

    var senators_svg = svg
        .append("rect")
        .attr("x", width - senators_width)
        .attr("height", senators_height)
        .attr("width", senators_width)
        .attr("fill", "#dee1dd")
        .style("opacity", 0.5);

    senator_1 = new Senator(svg, senator_width, senator_height, senator_x, senator_y / 2);
    senator_2 = new Senator(svg, senator_width, senator_height, senator_x, senator_y * 1.5 + senator_height);

    senators_list = []
    senators_list.push(senator_1)
    senators_list.push(senator_2)

    var prediction_svg = svg
        .append("rect")
        .attr("x", width - senators_width)
        .attr("y", height - prediction_height)
        .attr("height", prediction_height)
        .attr("width", senators_width)
        .attr("fill", "#d3d6d2")
        .style("opacity", 0.5);

    var dys = ["-0.65em", ".35em", "1.35em"];
    var texts = ["Would you have voted for", "limiting the tax cuts for", "the wealthier population?"];

    for (var i = 0; i < dys.length; i++) {
        svg
            .append("text")
            .attr("x", width - senators_width * 0.65)
            .attr("y", height - prediction_height / 2)
            .attr("text-anchor", "middle")
            .attr("dy", dys[i])
            .attr("font-size", prediction_height / 5)
            .attr("class", "noselect")
            .text(function () {
                return texts[i];
            });
    }

    legend_dys = ["-0.65em", ".35em", "1.35em","2.35em"];
    var party = ["Republicans", "Democrats", "Independent","You"];
    var color = [rep_color,dem_color,indp_color,you_color];

    for (var i = 0; i < legend_dys.length; i++) {
        svg
            .append("text")
            .attr("x", width/3)
            .attr("y", height - prediction_height / 2 + i * 20 -30)
            .attr("text-anchor", "middle")
            .attr("font-size", prediction_height / 5)
            .attr("class", "noselect")
            .text(function () {
                return party[i];
            });

        svg
            .append("rect")
            .attr("x", width/4*1.05)
            .attr("y", height - prediction_height / 2 + i * 20 -40)
            .attr("width",width/50)
            .attr("width",width/50)
            .attr("height",height/100)
            .attr("class", "noselect")
            .style("fill",color[i])
    }

    svg
        .append("rect")
        .attr("width", senators_width * 0.05)
        .attr("height", prediction_height)
        .attr("x", width - senators_width * 0.3)
        .attr("y", height - prediction_height)
        .attr("fill", "#000000")
        .style("opacity", 0.5);


    answer_prediction = svg.append("text").attr("x", width - senators_width / 8)
        .attr("y", height - prediction_height / 2)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("font-size", prediction_height / 5)
        .attr("class", "noselect");
}
init();

function get_questions(id){
    return questions_list[parseInt(id)]
}
function get_go_button(){
    return goButton;
}

function add_new_node(){
    file_name = "";

    for(var i = 0; i<questions_list.length;i++){
        file_name += questions_list[i].answer.toString() + ", "
    }

    file_name_embedding = "data/Embedding/vote_[" + file_name.slice(0, -2) + "].csv";
    file_name_face = "data/Faces_votes/vote_[" + file_name.slice(0, -2) + "].csv";
    file_name_answer = "data/Prediction/vote_[" + file_name.slice(0, -2) + "].csv";

    d3.csv(file_name_answer, function (prediction) {
        if(prediction[0][0] === "-1.0"){
            answer_prediction.text(function () {
                return "NO";
            });
        } else {
            answer_prediction.text(function () {
                return "YES";
            });
        }
    });


    d3.csv(file_name_face, function (senator_images) {
        for (var i = 0; i < senator_images.length; i++) {
            senators_list[i].SetFace(senator_images[i]["name"], senator_images[i]["member_id"]+".jpg",senator_images[i]["party"])
        }
    });

    nodes.splice(size, 1);
    links = links.filter(function (l) {
        return l.source['index'] !== size && l.target['index'] !== size;
    });
    d3.event.stopPropagation();

    restart();

    var node = {"party":"You","name":"You"};
    nodes.push(node);

    d3.csv(file_name_embedding, function (data) {
        nodes.forEach(function (target) {
            for(var i =0;i<data.length;i++) {
                if(data[i][0]>0 && i  === target["index"]) {
                    links.push({source: node, target: target,"weight":data[i][0]});
                }
            }
        });

        restart()
    })
}

function Notify_demo_new_answer() {
    var all_complete = true;

    for(var i = 0; i<questions_list.length;i++){
        if(questions_list[i].answer == null){
            all_complete = false;
        }
    }

    if(all_complete){
        goButton.enable()
    }
}

function restart() {
    node = node.data(nodes);

    node.enter()
        .append("circle")
        .attr("stroke","black")
        .attr("class", "node")
        .style("fill", function (d) {
        var party = d['party'];
        switch (party){
            case "R":
                return rep_color;
            case "D":
                return dem_color;
            case "I":
                return indp_color;
            case "You":
                return you_color;
        }
        }).attr("r", 5).on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut).call(force.drag);


    node.exit()
        .remove();

    link = link.data(links);

    link.enter().insert("line", ".node")
        .attr("class", "link")
        .style("opacity", function (d) {
        return 0.2;
    }).style("stroke-width", function (d) {
        if (d.source.party === "You"){
            return 0.2+2*(d.weight)
        }
        return 0.2+1*(d.weight);
    }).style("stroke", function(d) {
        if (d.source.party === "You" && d.target.party === "D") {
            return dem_color
        }
        if (d.source.party === "You" && d.target.party === "R") {
            return rep_color
        }
        if (d.source.party === "You" && d.target.party === "I") {
            return indp_color
        }
    });
    link.exit()
        .remove();

    force.start();
}

function handleMouseOver(d) {  // Add interactivity
    if (d3.selectAll("#id" + d['id'])[0].length === 0) {
        // Specify where to put label of text
       svg
            .append("text")
           .attr("y",30)
           .attr("x",width/4)
           .attr("id", "id" + d['id'])
            .attr("font-size",height/30)
            .attr("class","noselect")
            .text(function () {
                return d.name;  // Value of the text
            });
    }
}

function handleMouseOut(d) {
    d3.select("#id" + d['id']).remove();  // Remove text location
}