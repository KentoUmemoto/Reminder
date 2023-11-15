import { Loading } from 'react-daisyui'
export const Spinner = () => {
  return (
    <div role='status'>
      <Loading color='primary' />
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
