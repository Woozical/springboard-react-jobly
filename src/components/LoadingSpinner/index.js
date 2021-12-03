import "./style.css";
const LoadingSpinner = ( {withText=false, noPadding=false} ) => {
  return (
    <div className={noPadding ? "" : "pt-5"}>
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