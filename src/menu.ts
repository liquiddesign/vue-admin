export interface MenuItem {
    title: string,
    name?: string,
    items?: Array<MenuItem>,
    route?: string,
    icon?: string,
}

const menu: Array<MenuItem> = [
    {
        title: 'Dashboardy',
        name: 'dashboard',
        items: [
            {
                title: 'Velký přehled',
                name: 'dashboard',
                icon: 'pe-7s-rocket',
                items: []
            }
        ]
    },
    {
        title: 'Katalog',
        items: [
            {
                title: 'Produkty',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            },
            {
                title: 'Atributy',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            }
        ],
    },
    {
        title: 'Zákazníci',
        items: [
            {
                title: 'Objednávky',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            },
            {
                title: 'Uživatelé',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            },
            {
                title: 'Cenotvorba a akce',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            }
        ],
    },
    {
        title: 'Obsah',
        items: [
            {
                title: 'Menu, stránky a články',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            },
            {
                title: 'Widgety',
                icon: 'pe-7s-portfolio',
                name: 'hire',
                items: [
                    { title: 'Poptávky', route: 'hireLeads',},
                    { title: 'Podklady', route: 'hireQuestionnaires',},
                    { title: 'Nabídky', route: 'hireOffers',},
                    { title: 'Registrace', route: 'hireRegistrations',},
                    { title: 'Přejímky od M', route: 'hireFinished',},
                ]
            }
        ],
    }
];

 export default menu;