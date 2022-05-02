import { Subjects, Publisher, ExpirationCompleteEvent } from '@eventspaceticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}