import { Amenities, Box, Separator, Strikethrough, Text, Type } from "./TippyBoxStyledComponents";

function TippyBox({$type, $price, $offer, $discount, $description, $amenities}: {$type: string, $price: number, $offer: boolean, $discount: number, $description: string, $amenities: string[]}) {
    return <Box>
        <Type>{$type}</Type>
        <Separator/>
        {$offer ? <Strikethrough>${$price.toFixed(2)}</Strikethrough> : <Text>${$price.toFixed(2)}</Text>}
        {$offer ? <Text><b>${$discount.toFixed(2)}</b></Text> : ""}
        <Text><i>{$description}</i></Text>
        <Separator/>
        <Text>Amenities:</Text>
        <Amenities>
            {$amenities.map((amenity: string) => {
                return <li>&emsp;-{amenity}</li>;
            })}
        </Amenities>
    </Box>;
}

export default TippyBox;