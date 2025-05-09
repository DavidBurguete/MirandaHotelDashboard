import { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import * as FormStyled from "../../js/FormStyledComponents";
import { useDispatch } from "react-redux";
import { fetchRooms, updateRoom } from "../Rooms/RoomsSlice";
import PageWrapper from "../../components/PageWrapper";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Room, AmenitiesOptions, RoomTypeOptions, RoomStatusOptions } from "../../interfaces/RoomInterfaces";
import { enumRoomStatus } from "../../enums/RoomEnum";

function EditRoom(){
    const dispatch = useDispatch<useAppDispatch>();
    const { id } = useParams();
    const rooms = useAppSelector((state: RootState) => state.rooms);
    const [ room, setRoom ] = useState<Room>();
    const [selectedRoomType, setSelectedRoomType] = useState<SingleValue<RoomTypeOptions>>();
    const [roomName, setRoomName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [hasOffer, setHasOffer] = useState<boolean>(false);
    const [discount, setDiscount] = useState<number>(0);
    const [selectedAmenities, setSelectedAmenities] = useState<MultiValue<AmenitiesOptions>>([]);
    const [selectedStatusType, setSelectedStatusType] = useState<SingleValue<RoomStatusOptions>>();
    const navigate = useNavigate();
    
    const amenititesOptions = [
        { value: 'TV', label: 'TV' },
        { value: 'Fridge', label: 'Fridge' },
        { value: 'Bathtub', label: 'Bathtub' },
        { value: 'Sea View', label: 'Sea View' },
        { value: 'Air Conditioner',  label: 'Air Conditioner'}
    ] as AmenitiesOptions[];

    const roomTypeOptions = [
        { value: 'Single Bed', label: 'Single Bed' },
        { value: 'Double Bed', label: 'Double Bed' },
        { value: 'Double Superior', label: 'Double Superior' },
        { value: 'Suite', label: 'Suite' }
    ] as RoomTypeOptions[];

    const roomStatusOptions = [
        { value: 'Available', label: 'Available' },
        { value: 'Booked', label: 'Booked' }
    ] as RoomStatusOptions[];

    useEffect(() => {
        if(rooms.loading as boolean){
            dispatch(fetchRooms());
        }
    }, []);

    useEffect(() => {
        if(!rooms.loading){
            setRoom(rooms.rooms.find(room => room._id === (id as string)));
        }
    }, [rooms]);

    useEffect(() => {
        if(room !== undefined){
            setSelectedRoomType(roomTypeOptions.find(type => 
                room.room_type.toLowerCase().includes(type.value.toLowerCase())
            ));
            setRoomName(room.room_name);
            setDescription(room.description);
            setPrice(room.price);
            setHasOffer(room.offer);
            setDiscount(Math.floor((1 - (room.discount / room.price)) * 100));
            setSelectedAmenities(amenititesOptions.filter(amenity => {
                return room.amenities.includes(amenity.value);
            }));
            setSelectedStatusType(roomStatusOptions.find(type => 
                room.status.toLowerCase().includes(type.value.toLowerCase())
            ));
        }
    }, [room]);

    const handleRoomTypeChange = (selectedOptions: SingleValue<RoomTypeOptions>) => {
        setSelectedRoomType(selectedOptions);
    };

    const handleRoomName = (roomName: React.ChangeEvent) => {
        const HTMLInputElement = roomName.target as HTMLInputElement;
        setRoomName(HTMLInputElement.value);
    }

    const handleDescription = (description: React.ChangeEvent) => {
        const HTMLInputElement = description.target as HTMLInputElement;
        setDescription(HTMLInputElement.value);
    }

    const handlePrice = (price: React.ChangeEvent) => {
        const HTMLInputElement = price.target as HTMLInputElement;
        if(isNaN(parseInt(HTMLInputElement.value))){
            setPrice(0);
        }
        else{
            setPrice(parseFloat(parseFloat(HTMLInputElement.value).toFixed(2)));
        }
    }

    const handleHasOffer = (check: React.ChangeEvent) => {
        const HTMLInputElement = check.target as HTMLInputElement;
        setHasOffer(HTMLInputElement.checked);
    }

    const handleDiscount = (discount: React.ChangeEvent) => {
        const HTMLInputElement = discount.target as HTMLInputElement;
        if(isNaN(parseInt(HTMLInputElement.value)) || parseInt(HTMLInputElement.value) < 0 || parseInt(HTMLInputElement.value) > 100){
            setDiscount(0);
        }
        else{
            setDiscount(parseInt(HTMLInputElement.value));
        }
    }

    const handleAmenitiesChange = (selectedOptions: MultiValue<AmenitiesOptions>) => {
        setSelectedAmenities(selectedOptions);
    };

    const handleRoomStatusChange = (selectedOptions: SingleValue<RoomStatusOptions>) => {
        setSelectedStatusType(selectedOptions);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const notFullfilledData = selectedAmenities.length === 0 || 
                                  selectedRoomType === undefined || 
                                  description === "" || 
                                  price < 10;
        if(!notFullfilledData){
            let amenities = selectedAmenities.map(amenitie => {
                return amenitie.value;
            });
            const updatedRoom = {
                "_id": id,
                "room_name": roomName,
                "room_type": (selectedRoomType as RoomTypeOptions).value,
                "description": description,
                "photos":  "/img/hotel-room-1.jpg__/img/hotel-room-2.jpg__/img/hotel-room-3.jpg__/img/hotel-room-4.jpg",
                "offer": hasOffer,
                "price": parseFloat(price.toFixed(2)),
                "discount": parseFloat((price * (1.00 - discount / 100)).toFixed(2)),
                "cancellation_policy": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                "amenities": amenities,
                "status": enumRoomStatus.Available
            } as Room;
            dispatch(updateRoom(updatedRoom));
            navigate("/rooms");
        }
    }

    return <PageWrapper>
        <FormStyled.Form onSubmit={handleSubmit}>
            <FormStyled.Label htmlFor="room_type">
                Room type
                <Select
                    id="room_type"
                    value={selectedRoomType}
                    onChange={handleRoomTypeChange}
                    options={roomTypeOptions}
                    styles={{
                        control: (baseStyles, _) => ({
                            ...baseStyles,
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "#393939"
                        })
                    }}
                />
            </FormStyled.Label>
            <FormStyled.Label htmlFor="roomName">
                Room name
                <FormStyled.Input type="text" name="roomName" id="roomName" placeholder="Enter the room name" onChange={handleRoomName} value={roomName}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="description">
                Description
                <FormStyled.Input type="text" name="description" id="description" placeholder="Enter description" onChange={handleDescription} value={description}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="price">
                Price
                <FormStyled.Input type="number" step=".01" name="price" id="price" placeholder="Enter room price" onChange={handlePrice} value={price}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="offer">
                Has discount?
                <FormStyled.InputCheckBox type="checkbox" name="offer" id="offer" onChange={handleHasOffer} checked={hasOffer}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="discount">
                Percent discount
                <FormStyled.Input step="1" type="number" name="discount" id="discount" placeholder="Enter discount percentage" disabled={!hasOffer} onChange={handleDiscount} value={discount}/>
            </FormStyled.Label>
            <FormStyled.Label htmlFor="amenities">
                Amenities
                <Select
                    isMulti
                    value={selectedAmenities}
                    onChange={handleAmenitiesChange}
                    options={amenititesOptions}
                    styles={{
                        control: (baseStyles, _) => ({
                            ...baseStyles,
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "#393939"
                        })
                    }}
                />
            </FormStyled.Label>
            <FormStyled.Label htmlFor="status">
                Status
                <Select
                    id="status"
                    value={selectedStatusType}
                    onChange={handleRoomStatusChange}
                    options={roomStatusOptions}
                    styles={{
                        control: (baseStyles, _) => ({
                            ...baseStyles,
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            borderRadius: "0.5rem",
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            fontSize: "1rem",
                            color: "#393939"
                        })
                    }}
                />
            </FormStyled.Label>
            <FormStyled.InputSubmit type="submit" value="Update Room"/>
        </FormStyled.Form>
    </PageWrapper>;
}

export default EditRoom;