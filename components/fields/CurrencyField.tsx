import NumberFormat from 'react-number-format';

type Props = {
  value: any,
  [rest : string] : any,
}

export default function CurrencyField({value, rest} : Props){
  return(
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator=' '
      suffix="€"
      {...rest}
    />
  )
}