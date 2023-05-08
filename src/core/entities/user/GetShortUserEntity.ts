export interface GetShortUserEntity {
	id: string;
	firstName: string;
	lastName: string;
	nickname: string;
    registrationDate: Date;
	profileImageUrl: string | null;
}