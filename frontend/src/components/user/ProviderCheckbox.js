
const ProviderCheckbox = (props) => {
    return (
      <label>
      <input
        className="subscription-checkbox"
        type="checkbox"
        value= {props.providerName}
        onChange={props.onChange}
      />
      {props.providerName}
    </label>
    )
}

export default ProviderCheckbox;