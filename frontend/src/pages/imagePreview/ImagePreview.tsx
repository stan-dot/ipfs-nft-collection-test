import { useState, ReactElement } from "react";
import { ApiService } from "../../services/api.service";


export function ImagePreview(props: { apiService: ApiService }): ReactElement {
  const [numberRequested, setNumberRequested] = useState(0);
  const [currentInput, setCurrentInput] = useState("0");
  const [image, setImage] = useState(null);
  const getImage = async (n: number) => {
    const image = await props.apiService.getImage(n);
    setImage(image);
  }

  const requestHandler = () => {
    console.log('chaing the request from ', currentInput
    )
    const int = parseInt(currentInput);
    setNumberRequested(int);
    getImage(int);
  }

  return <div id='imagePreview'>

    <form>
      <div className="d-flex justify-content-evenly mt-4 mx-4 px-4">
        <div className="mb-3 col-md-5">
          <label htmlFor="amount" className="form-label">Amount of tokens</label>
          <div id="amount" className="form-text">Currently requested</div>
          <input
            id="amount"
            type="number"
            placeholder={numberRequested.toString()}
            onChange={e => setCurrentInput(e.target.value)}
            className="form-control text-center"
            aria-describedby="amount" />

        </div>
        <div className="mb-3 mt-4 col-md-3">
          <button type='button' className="button btn-lg btn-primary w-100"
            onClick={requestHandler}>Request</button>
        </div>
      </div>
    </form>
    <div id="imageDisplay">
      {
        image &&
        <figure id="currentDisplay">
          <img src={image} />
          <figcaption>Currently displayed image {numberRequested}</figcaption>
        </figure>
      }
    </div>
  </div>
}