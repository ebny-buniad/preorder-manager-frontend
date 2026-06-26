import CreatePreorderForm from '@/components/CreatePreorder/CreatePreorderForm'
import FormHeader from '@/components/form/FormHeader'
export default function CreatePreorder() {
  return (
    <div className='shadow-md rounded-xl max-w-4xl mx-auto border'>
      <FormHeader/>
      <div className='px-'>
        <CreatePreorderForm/>
      </div>
    </div>
  )
}
