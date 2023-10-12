import { NextRequest } from "next/server";

// import {PrismaClient} from '@prisma/client'

// const prisma = new PrismaClient()



export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const data = await req.json()
    console.log('data =>', data);
    // Get data from webhook

    // Retrieve user by its email and save appointment in users db

    // Send email to eva & Lionel with customer data and answers





    return new Response(JSON.stringify({ }), { status: 200 });

  } else {
    return new Response("Method not allowed", { status: 405 });
  }
}


// data model
// data => {
//   created_at: '2023-10-12T15:13:13.000000Z',
//     created_by: 'https://api.calendly.com/users/b810e895-5164-4bed-8920-f5dec69cd439',
//     event: 'invitee.created',
//     payload: {
//     cancel_url: 'https://calendly.com/cancellations/53730ba1-7e1f-46be-b5dd-b798999a99ca',
//       created_at: '2023-10-12T15:13:12.650526Z',
//       email: 'jossic.lapierre@gmail.com',
//       event: 'https://api.calendly.com/scheduled_events/713595a3-f61e-4b47-a870-d91eb3b924b6',
//       first_name: null,
//       invitee_scheduled_by: null,
//       last_name: null,
//       name: 'sgsdg',
//       new_invitee: null,
//       no_show: null,
//       old_invitee: null,
//       payment: null,
//       questions_and_answers: [],
//       reconfirmation: null,
//       reschedule_url: 'https://calendly.com/reschedulings/53730ba1-7e1f-46be-b5dd-b798999a99ca',
//       rescheduled: false,
//       routing_form_submission: null,
//       scheduled_event: {
//       created_at: '2023-10-12T15:13:12.633488Z',
//         end_time: '2023-10-13T08:30:00.000000Z',
//         event_guests: [],
//         event_memberships: [Array],
//         event_type: 'https://api.calendly.com/event_types/26e2c20d-a9eb-42a8-981c-e9b8680b3c7c',
//         invitees_counter: [Object],
//         location: [Object],
//         name: '30 Minute Meeting',
//         start_time: '2023-10-13T08:00:00.000000Z',
//         status: 'active',
//         updated_at: '2023-10-12T15:13:12.633488Z',
//         uri: 'https://api.calendly.com/scheduled_events/713595a3-f61e-4b47-a870-d91eb3b924b6'
//     },
//     scheduling_method: null,
//       status: 'active',
//       text_reminder_number: null,
//       timezone: 'Europe/Berlin',
//       tracking: {
//       utm_campaign: null,
//         utm_source: null,
//         utm_medium: null,
//         utm_content: null,
//         utm_term: null,
//         salesforce_uuid: null
//     },
//     updated_at: '2023-10-12T15:13:12.650526Z',
//       uri: 'https://api.calendly.com/scheduled_events/713595a3-f61e-4b47-a870-d91eb3b924b6/invitees/53730ba1-7e1f-46be-b5dd-b798999a99ca'
//   }
// }