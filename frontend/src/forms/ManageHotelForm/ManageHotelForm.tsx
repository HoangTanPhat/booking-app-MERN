import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
};

type Props = {
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();
        Object.entries(formDataJson).map(([key, value]) => {
            if (key === 'facilities') {
                return formDataJson.facilities.forEach((facility, index) => {
                    formData.append(`facilities[${index}]`, facility);
                });
            }

            if (key === 'imageFiles') {
                return Array.from(formDataJson.imageFiles).forEach(
                    (imageFile) => {
                        formData.append('imageFiles', imageFile);
                    }
                );
            }

            const stringValue = value.toString();
            formData.append(key, stringValue);
        });
        onSave(formData);
        console.log(formData);
    });
    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className='flex justify-end'>
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500'
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};
export default ManageHotelForm;
