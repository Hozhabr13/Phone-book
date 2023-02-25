export type ContactType = {
    cell: string;
    name: {
        first: string,
        last: string,
        title: string
    }
    email: string;
    phone: number;
    location: {
        city: string,
        street: any,
        postcode: string,
        state: string
    };
    picture: {
        medium: string
    }    
}