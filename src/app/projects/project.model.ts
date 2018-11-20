import { JournalComment } from './projects-list/projects-details/project-journal/journal-comment.model';

export interface Project {
    customerName?: string;
    jobId?: string;
    paperFile?: string;
    claimNumber?: string;
    policyNumber?: string;
    phoneNumber?: string;
    dateReceived?: Date;
    adress?: string;
    insuranceCompany?: string;
    status?: string;
    journalComments: JournalComment[];
}
