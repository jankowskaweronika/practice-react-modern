const formFields = [
  {
    name: 'nameAndSurname',
    label: 'Name and Surname',
    type: 'text',
    required: true,
    regex: /^(.{2,})\s(.{2,})$/,
    errorMessage: 'Please enter at least 2 characters before and after space.',
  },
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    required: true,
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    errorMessage: 'Invalid email format.',
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: false,
    regex: /^\+?[0-9]{8,15}$/,
    errorMessage: 'Invalid phone number.',
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    required: true,
    regex: /^.{5,}$/,
    errorMessage: 'Subject must be at least 5 characters.',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    regex: /^.{15,}$/,
    errorMessage: 'Message must be at least 15 characters.',
  },
];
export default formFields;