import "./style.css";

const LoadingSpinner = ({withText=false}) => {
  return (
    <div className="pt-5">
      {withText && <p>Loading...</p>}
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingSpinner;