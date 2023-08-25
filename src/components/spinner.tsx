
import './spinner.css'

type SpinnerProps = {
  size?: 'lg' | 'sm' | 'xs',
}

const Spinner = ({ size = 'lg' }: SpinnerProps) => (
  <div className={`w-full m-auto flex justify-center items-center`}>
    <div className={`loader ${size}`} />
  </div>
)

export default Spinner
