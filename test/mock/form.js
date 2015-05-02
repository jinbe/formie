var testFormData = {
    id: 'testForm',
    title: 'General Medical Questions',
    fields: [
        {
            type: 'choiceGroup',
            id: 'medicalSmokeCheckGroup',
            abstract: true,
            choiceField: {
                type: 'yesNo',
                id: 'medicalSmokeCheck',
                question: 'Do you smoke?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'group',
                        id: 'medicalSmokeDetails',
                        abstract: false,
                        question: 'About your smoking',
                        subfields: [
                            {
                                type: 'text',
                                id: 'medicalSmokeAmount',
                                question: 'How many cigarettes do you smoke per day?',
                                validation: {
                                    required: true
                                }
                            },
                            {
                                type: 'text',
                                id: 'medicalSmokeTime',
                                question: 'How long have you been smoking for?',
                                validation: {
                                    required: true
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            type: 'option',
            id: 'medicalAlcoholFrequency',
            question: 'How often do you drink alcohol?',
            validation: {
                required: true
            },
            options: ['Not at all', 'Rarely', 'Less than 2 standard drinks per day', 'More than 2 standard drinks per day']
        },
        {
            type: 'choiceGroup',
            id: 'medicalHearthCheckGroup',
            label: 'medicalHearthCheckGroup',
            abstract: false,
            choiceField: {
                type: 'yesNo',
                id: 'medicalHearthCheck',
                question: 'Have you had any cardiovascular (heart) problems or have you ever had a stroke?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'group',
                        id: 'medicalHearthDetails',
                        label: 'medicalHearthDetails',
                        abstract: true,
                        question: 'About your hearth',
                        subfields: [
                            {
                                type: 'textArea',
                                id: 'medicalHearthDetails',
                                question: 'Please provide further details about your heart condition',
                                validation: {
                                    required: true
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            type: 'choiceGroup',
            id: 'medicalAllergiesCheckGroup',
            abstract: true,
            choiceField: {
                type: 'yesNo',
                id: 'medicalAllergiesCheck',
                question: 'Do you suffer from any allergies?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'textArea',
                        id: 'medicalAllergiesDetails',
                        question: 'Please provide further details about your allergies',
                        validation: {
                            required: true
                        }
                    }
                ]
            }
        },
        {
            type: 'choiceGroup',
            id: 'medicalMedicationsCheckGroup',
            abstract: true,
            choiceField: {
                type: 'yesNo',
                id: 'medicalMedicationsCheck',
                question: 'Are you currently taking any medication?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'textArea',
                        id: 'medicalMedicationsDetails',
                        question: 'Please provide the exact name and dose if available',
                        validation: {
                            required: true
                        }
                    }
                ]
            }
        },
        {
            type: 'choiceGroup',
            id: 'medicalHistoryCheckGroup',
            label: 'medicalHistoryCheckGroup',
            abstract: false,
            choiceField: {
                type: 'yesNo',
                id: 'medicalHistoryCheck',
                question: 'Is there a history of any disorder that has run within your family?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'textArea',
                        id: 'medicalHistoryDetails',
                        question: 'Please provide more information, including as much detail as possible',
                        validation: {
                            required: true
                        }
                    }
                ]
            }
        },
        {
            type: 'choiceGroup',
            id: 'medicalSurgeryCheckGroup',
            abstract: true,
            choiceField: {
                type: 'yesNo',
                id: 'medicalSurgeryCheck',
                question: 'Have you ever had any major surgery?',
                validation: {
                    required: true
                }
            },
            choiceSubfields: {
                yes: [
                    {
                        type: 'group',
                        id: 'medicalSurgeryDetailsGroup',
                        abstract: true,
                        subfields: [
                            {
                                type: 'textArea',
                                id: 'medicalSurgeryDetails',
                                question: 'Please provide further details of surgery undergone, including any relevant dates',
                                validation: {
                                    required: true
                                }
                            }
                        ]
                    }
                ]
            }
        },
        {
            type: 'height',
            id: 'medicalHeight',
            question: 'What is your height?',
            validation: {
                required: true
            }
        },
        {
            type: 'weight',
            id: 'medicalWeight',
            question: 'What is your weight?',
            validation: {
                required: false
            }
        },
        {
            type: 'date',
            id: 'dateField',
            question: 'What is the date?',
            validation: {
                required: true
            }
        },
        {
            type: 'check',
            id: 'checkField',
            question: 'Do you check?',
            validation: {
                required: true
            }
        },
        {
            type: 'bloodPressure',
            id: 'medicalBloodPressure',
            question: 'What is your blood pressure?',
            validation: {
                required: true,
                naCheck: 'I do not know my blood pressure'
            }
        }
    ]
};
