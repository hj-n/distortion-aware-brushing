import Brushing from "./components/Brushing";



function App({match}) {
  const PATH = "http://127.0.0.1:5000/";

  const defaultParams = {
    dataset: "mnist",
    method: "pca",
    sample_rate: 5
  }

  const params = match.params;
  const dataset     = params.dataset === undefined ? defaultParams.dataset : params.dataset;
  const method      = params.method  === undefined ? defaultParams.method  : params.method;
  const sample_rate = params.sample  === undefined || isNaN(parseInt(params.sample)) ? defaultParams.sample_rate  : parseInt(params.sample);


  return (
    <div className="App">
      <Brushing 
        url={PATH}
        size={500}
        margin={10}
        dataset={dataset}
        method={method}
        sample={sample_rate}
        resolution={25}
      />
    </div>
  );
}

export default App;
