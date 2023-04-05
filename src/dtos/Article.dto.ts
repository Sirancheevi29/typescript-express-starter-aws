import { IsString } from 'class-validator';

export class CreateArtcile {
    @IsString()
    public an_initial_assignment_date: string
    @IsString()
    public an_status: string
    @IsString()
    public an_source_system: string
    @IsString()
    public an_distribution_comment: string
    @IsString()
    public an_distribution_date: string
    @IsString()
    public an_group: string
}