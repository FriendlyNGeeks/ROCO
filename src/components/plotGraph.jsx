import { Component } from "react";
import Plotly from 'plotly.js-dist';
import Plot from 'react-plotly.js';

// WDS uses sockjs for hot-reloading, so OctoPrint's socket does not
export default class PlotGraph extends Component {

    componentDidMount() {
        // Runs after the first render() lifecycle
        var cnt = 0;
        this.props.data[0].subscribe(
            (msg) => {
                if(msg.current){
                    if (msg.current.temps[0]) {
                        Plotly.extendTraces('tempgraph', { y:[[msg.current.temps[0].tool0.actual]] }, [0]);
                        Plotly.extendTraces('tempgraph', { y:[[msg.current.temps[0].tool0.target]] }, [1]);
                        Plotly.extendTraces('tempgraph', { y:[[msg.current.temps[0].bed.actual]] }, [2]);
                        Plotly.extendTraces('tempgraph', { y:[[msg.current.temps[0].bed.target]] }, [3]);
                        var layout_update = {};
                        Plotly.update('tempgraph', {name: 'Actual T0: ' + [[msg.current.temps[0].tool0.actual]] + '&deg;C'}, layout_update, 0);
                        Plotly.update('tempgraph', {name: 'Target T0: ' + [[msg.current.temps[0].tool0.target]] + '&deg;C'}, layout_update, 1);
                        Plotly.update('tempgraph', {name: 'Actual Bed: ' + [[msg.current.temps[0].bed.actual]] + '&deg;C'}, layout_update, 2);
                        Plotly.update('tempgraph', {name: 'Target Bed: ' + [[msg.current.temps[0].bed.target]] + '&deg;C'}, layout_update, 3);
                    }
                }
                console.log("plotGraph payload: ", msg)
            },
            (err) => console.error(err),
            () => console.log("complete")
        ); 
        setInterval(function(){
        cnt++;
        if(cnt > 1800 ) {
            Plotly.relayout('tempgraph',{
                xaxis: {
                    range: [cnt-1800,cnt]
                    }
                });
        };
        },1000)
    }
    
    constructor(props) {
        super(props);
        
        this.statsTempGraphStyle = {
            width: "calc(25%-16px)"
        }
        this.state = {
            data: [
            { 
                y:[0],
                legendgroup: 'tool0',
                line: {color: '#dc3545'},
                type: 'line',
                mode: 'lines',
                name: "Actual T0: 0&deg;C"
            }, { 
                y:[0],
                legendgroup: 'tool0',
                line: {color: '#F88'},
                type: 'line',
                mode: 'lines',
                name: "Target T0: 0&deg;C"
            }, { 
                y:[0],
                legendgroup: 'bed',
                line: {color: '#007bff'},
                type: 'line',
                mode: 'lines',
                name: "Actual Bed: 0&deg;C"
            }, { 
                y:[0],
                legendgroup: 'bed',
                line: {color: '#88F'},
                type: 'line',
                mode: 'lines',
                name: "Target Bed: 0&deg;C"
            }
          ], 
          layout: {
            showlegend: true,
            legend: {
                font: {
                    color: '#f8f9fa'
                },
                orientation: 'h',
                x: 0,
                xanchor: 'left',
                y: -0.05,
                yanchor: 'top'
            },
            margin: {
                l: 40,
                r: 0,
                t: 10,
                b: 0
            },
            xaxis: {
                color: '#f8f9fa',
                rangemode: 'reversed'
            },
            yaxis: {
                color: '#f8f9fa',
                range:[0,300]
            },
            width: 460,
            height: 360,
            paper_bgcolor: '#343a40',
            plot_bgcolor: '#343a40'
          }, 
          config: {
            displayModeBar: false,
            staticPlot: true,
            responsive: true
          }
      };
    }

    // const [ tool0Actual, setTool0Actual ] = useState("Actual T0: 0&deg;C"); //response.temperature.tool0.actual;
    // const [ tool0Target, setTool0Target ] = useState("Target T0: 0&deg;C"); //response.temperature.tool0.target;
    // const [ bedActual, setBedActual ] = useState("Actual Bed: 0&deg;C"); //response.temperature.bed.actual;
    // const [ bedTarget, setBedTarget ] = useState("Target Bed: 0&deg;C"); //response.temperature.bed.target;
    
    render(){
        return (
            <>
              <Plot divId="tempgraph" className="border mx-2" style={ this.stylestatsTempGraphStyle } data={ this.state.data } layout={ this.state.layout } config={ this.state.config } onInitialized={(figure) => this.setState(figure)} onUpdate={(figure) => this.setState(figure)}></Plot>
            </>
        );
    }
}
