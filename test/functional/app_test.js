import 'jquery';
import angular from 'angular';
import {v1 as uuidV1} from 'uuid';

import { moduleName } from '../../src/js/app.js';
import ngMockE2E from 'angular-mocks/ngMockE2E';

const app = angular.module('caliopenAppTest', [
  moduleName,
  ngMockE2E,
]);

/* eslint-disable */
app.run(function mockApi ($httpBackend, ApiUrl) {
  'ngInject';
  const internalServerErrorResponse = [500, 'Internal Server Error', { 'Content-Type': 'text/plain' }];

  // beware: thread coll doesn't have "contacts" info anymore
  // cf. https://github.com/CaliOpen/Caliopen/issues/31
  const threadColl = {"total": 2, "threads": [{"tags": [], "text": "<p>It's okay, Bender. I like cooking too. You, minion. Lift my arm. AFTER H=\r\nIM! I don't know what you did, Fry, but once again, you screwed up! Now all\r\nthe planets are gonna start cracking wise abo", "date_update": null, "privacy_index": 1, "contacts": [{"type": "to", "contact_id": "1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f", "address": "test@caliopen.local"}, {"type": "from", "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "address": "zoidberg@caliopen.local"}], "date_insert": "2016-05-09T15:01:42.588000", "thread_id": "cd53e13a-267d-4d9c-97ee-d0fc59c64200", "total_count": 1, "attachment_count": 0, "importance_level": 0, "unread_count": 1}, {"tags": [], "text": "Shut up and take my money! Leela, are you alright? You got wanged on the he=\r\nad. Bender, you risked your life to save me! Spare me your space age techno=\r\nbabble, Attila the Hun! Now that the, uh, ga", "date_update": null, "privacy_index": 25, "contacts": [{"type": "to", "contact_id": "1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f", "address": "test@caliopen.local"}, {"type": "from", "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "address": "zoidberg@caliopen.local"}], "date_insert": "2016-05-09T15:01:42.489000", "thread_id": "46d30c27-6cd8-407b-8536-fda4196c20ca", "total_count": 2, "attachment_count": 0, "importance_level": 0, "unread_count": 2}]};
  const threadById = {
    threads: {
      'cd53e13a-267d-4d9c-97ee-d0fc59c64200': {"thread": {"tags": [], "text": "<p>It's okay, Bender. I like cooking too. You, minion. Lift my arm. AFTER H=\r\nIM! I don't know what you did, Fry, but once again, you screwed up! Now all\r\nthe planets are gonna start cracking wise abo", "date_update": null, "privacy_index": 1, "contacts": [{"type": "to", "contact_id": "1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f", "address": "test@caliopen.local"}, {"type": "from", "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "address": "zoidberg@caliopen.local"}], "date_insert": "2016-05-09T15:01:42.588000", "thread_id": "cd53e13a-267d-4d9c-97ee-d0fc59c64200", "total_count": 1, "attachment_count": 0, "importance_level": 0, "unread_count": 1}},
      '46d30c27-6cd8-407b-8536-fda4196c20ca': {"thread": {"tags": [], "text": "Shut up and take my money! Leela, are you alright? You got wanged on the he=\r\nad. Bender, you risked your life to save me! Spare me your space age techno=\r\nbabble, Attila the Hun! Now that the, uh, ga", "date_update": null, "privacy_index": 25, "contacts": [{"type": "to", "contact_id": "1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f", "address": "test@caliopen.local"}, {"type": "from", "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "address": "zoidberg@caliopen.local"}], "date_insert": "2016-05-09T15:01:42.489000", "thread_id": "46d30c27-6cd8-407b-8536-fda4196c20ca", "total_count": 2, "attachment_count": 0, "importance_level": 0, "unread_count": 2}},
    },
    messages: {
      'cd53e13a-267d-4d9c-97ee-d0fc59c64200': {"total": 1, "messages": [{"recipients": [], "tags": [], "type": "email", "privacy_index": 1, "external_thread_id": null, "date_insert": "2016-05-09T15:01:42.616018", "headers": {"Received": ["from localhost (localhost [127.0.0.1])\n by localhost (Postfix) with ESMTP id 12345678901;\n Mon, 9 May 2016 18:25:19 +0100 (CET)"], "From": ["Dr Zoidberg <zoidberg@caliopen.local>"], "Content-Disposition": ["inline"], "Content-Transfer-Encoding": ["quoted-printable"], "To": ["test@caliopen.local"], "Date": ["Mon, 9 May 2016 18:25:19 +0100"], "MIME-Version": ["1.0"], "Message-ID": ["<20141215172513.GF23183@caliopen.local>"], "Content-Type": ["text/plain; charset=\"UTF-8\""], "Subject": ["Dr. Zoidberg, that doesn't make sense. But, okay!"]}, "external_parent_id": null, "parts": [], "text": "<p>It's okay, Bender. I like cooking too. You, minion. Lift my arm. AFTER H=\r\nIM! I don't know what you did, Fry, but once again, you screwed up! Now all\r\nthe planets are gonna start cracking wise about our mamas.</p>\r\n<p>You don't know how to do any of those. Leela, Bender, we're going grave\r\nrobbing. And yet you haven't said what I told you to say! How can any of us\r\ntrust you? Leela's gonna kill me. File not found.</p>\r\n<h2>Fry! Quit doing the right thing, you jerk!</h2>\r\n<p>Daddy Bender, we're hungry. Goodbye, cruel world. Goodbye, cruel lamp. G=\r\noodbye, cruel velvet drapes, lined with what would appear to be some sort of\r\n cruel muslin and the cute little pom-pom curtain pull cords. Cruel though\r\n they may be\u2026</p>\r\n<ol>\r\n\r\n    <li>Switzerland is small and neutral! We are more like Germany, ambitio=\r\n\t\tus and misunderstood!</li><li>For the last time, I don't like lilacs! Y=\r\n\t\tour 'first' wife was the one who liked lilacs!</li><li>Isn't it true th=\r\n\t\tat you have been paid for your testimony?</li>\r\n\r\n</ol>\r\n\r\n<h3>I'm sorry, guys. I never meant to hurt you. Just to destroy everything\r\nyou ever believed in.</h3>\r\n<p>Of all the friends I've had\u2026 you're the first. I'm a thing. I was all of\r\nhistory's great robot actors - Acting Unit 0.8; Thespomat; David Duchovny!\r\nGoodbye, friends. I never thought I'd die like this. But I always really ho=\r\nped.</p>\r\n<ul>\r\n\r\n    <li>Is the Space Pope reptilian!?</li><li>Five hours? Aw, man! Couldn't\r\n\t\tyou just get me the death penalty?</li><li>My fellow Earthicans, as I hav=\r\n\t\te explained in my book 'Earth in the Balance'', and the much more popular\r\n\t\t''Harry Potter and the Balance of Earth', we need to defend our planet ag=\r\n\t\tainst pollution. Also dark wizards.</li>\r\n\r\n</ul>\r\n\r\n<p>No, of course not. It was\u2026 uh\u2026 porno. Yeah, that's it. Hi, I'm a naughty\r\nnurse, and I really need someone to talk to. $9.95 a minute. I'll get my kit\r\n! Michelle, I don't regret this, but I both rue and lament it.</p>\r\n<p>Fry! Stay back! He's too powerful! Why not indeed! Now that the, uh, gar=\r\nbage ball is in space, Doctor, perhaps you can help me with my sexual inhib=\r\nitions? Hello, little man. I will destroy you! I'll get my kit!</p>\r\n<p>A true inspiration for the children. Can we have Bender Burgers again? U=\r\ngh, it's filthy! Why not create a National Endowment for Strip Clubs while\r\nwe're at it? They're like sex, except I'm having them!</p>\r\n<p>Oh sure! Blame the wizards! Guards! Bring me the forms I need to fill out\r\n to have her taken away! I guess if you want children beaten, you have to do\r\nit yourself. If rubbin' frozen dirt in your crotch is wrong, hey I don't wa=\r\nnna be right.</p>\r\n<p>Kids don't turn rotten just from watching TV. Hi, I'm a naughty nurse, a=\r\nnd I really need someone to talk to. $9.95 a minute. Perhaps, but perhaps y=\r\nour civilization is merely the sewer of an even greater society above you!\r\n</p>\r\n<p>Hey, guess what you're accessories to. You lived before you met me?! I m=\r\neant 'physically'. Look, perhaps you could let me work for a little food? I\r\ncould clean the floors or paint a fence, or service you sexually?</p>\r\n<p>Fry, you can't just sit here in the dark listening to classical music. T=\r\noo much work. Let's burn it and say we dumped it in the sewer. No! The cat\r\nshelter's on to me. And when we woke up, we had these bodies.</p>\r\n<p>I saw you with those two \"ladies of the evening\" at Elzars. Explain that.\r\nNegative, bossy meat creature! Meh. Our love isn't any different from yours,\r\nexcept it's hotter, because I'm involved.</p>\r\n<p>Yes! In your face, Gandhi! Interesting. No, wait, the other thing: tedio=\r\nus. Daylight and everything. Just once I'd like to eat dinner with a celebr=\r\nity who isn't bound and gagged. Nay, I respect and admire Harold Zoid too m=\r\nuch to beat him to death with his own Oscar.</p>\r\n<p>Yes! In your face, Gandhi! A true inspiration for the children. Man, I'm\r\nsore all over. I feel like I just went ten rounds with mighty Thor. You mean\r\nwhile I'm sleeping in it? Yes, if you make it look like an electrical fire.\r\nWhen you do things right, people won't be sure you've done anything at all.\r\n</p>\r\n<p>They're like sex, except I'm having them! Spare me your space age techno=\r\nbabble, Attila the Hun! Now that the, uh, garbage ball is in space, Doctor,\r\nperhaps you can help me with my sexual inhibitions? Is the Space Pope repti=\r\nlian!?</p>\r\n", "date": "2016-05-09T17:25:19.000000", "importance_level": 71, "from_": "zoidberg@caliopen.local", "size": 4890, "external_message_id": "<20141215172513.GF23183@caliopen.local>", "message_id": "3d4d7f19-6bae-4ccf-9f3b-c23b34d5b035", "subject": "Dr. Zoidberg, that doesn't make sense. But, okay!"}]},
      '46d30c27-6cd8-407b-8536-fda4196c20ca': {"total": 2, "messages": [{"recipients": [], "tags": [], "type": "email", "privacy_index": 25, "external_thread_id": null, "date_insert": "2016-05-09T15:01:42.512546", "headers": {"Received": ["from localhost (localhost [127.0.0.1])\n by localhost (Postfix) with ESMTP id 12345678901;\n Mon, 9 May 2016 19:25:19 +0100 (CET)"], "From": ["Bender <bender@caliopen.local>"], "Content-Disposition": ["inline"], "Content-Transfer-Encoding": ["quoted-printable"], "To": ["test@caliopen.local, zoidberg@caliopen.local"], "References": ["<20141215172513.GF23183@caliopen.local>"], "In-Reply-To": ["<20141215172513.GF23183@caliopen.local>"], "Date": ["Mon, 9 May 2016 18:25:19 +0100"], "MIME-Version": ["1.0"], "Message-ID": ["<20141215172514.GF23183@caliopen.local>"], "Content-Type": ["text/plain; charset=\"UTF-8\""], "Subject": ["Re: Dr. Zoidberg, that doesn't make sense. But, okay!"]}, "external_parent_id": null, "parts": [], "text": "Shut up and take my money! Leela, are you alright? You got wanged on the he=\r\nad. Bender, you risked your life to save me! Spare me your space age techno=\r\nbabble, Attila the Hun! Now that the, uh, garbage ball is in space, Doctor,\r\nperhaps you can help me with my sexual inhibitions?\r\n\r\nI haven't felt much of anything since my guinea pig died. Ummm\u2026to eBay? I'm\r\na thing. Bender, hurry! This fuel's expensive! Also, we're dying! Shut up a=\r\nnd take my money!\r\n\r\nAnd yet you haven't said what I told you to say! How can any of us trust yo=\r\nu? This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You\r\ncan't just have your characters announce how they feel. That makes me feel\r\nangry!\r\n", "date": "2016-05-09T17:25:19.000000", "importance_level": 85, "from_": "bender@caliopen.local", "size": 1319, "external_message_id": "<20141215172514.GF23183@caliopen.local>", "message_id": "bc6f375f-fee1-4992-9e95-add2176f426c", "subject": "Re: Dr. Zoidberg, that doesn't make sense. But, okay!"}, {"recipients": [], "tags": [], "type": "email", "privacy_index": 2, "external_thread_id": null, "date_insert": "2016-05-09T15:01:42.733288", "headers": {"Received": ["from localhost (localhost [127.0.0.1])\n by localhost (Postfix) with ESMTP id 12345678901;\n Mon, 9 May 2016 19:25:19 +0100 (CET)"], "From": ["Dr Zoidberg <zoidberg@caliopen.local>"], "Content-Disposition": ["inline"], "Content-Transfer-Encoding": ["quoted-printable"], "To": ["test@caliopen.local"], "References": ["<20141215172513.GF23183@caliopen.local>"], "In-Reply-To": ["<20141215172513.GF23183@caliopen.local>"], "Date": ["Mon, 9 May 2016 21:25:19 +0100"], "MIME-Version": ["1.0"], "Message-ID": ["<20141215172515.GF23183@caliopen.local>"], "Content-Type": ["text/plain; charset=\"UTF-8\""], "Subject": ["Re: Dr. Zoidberg, that doesn't make sense. But, okay!"]}, "external_parent_id": null, "parts": [], "text": "I meant 'physically'. Look, perhaps you could let me work for a little food=\r\n? I could clean the floors or paint a fence, or service you sexually? I gue=\r\nss because my parents keep telling me to be more ladylike. As though!\r\n\r\nWe're rescuing ya. Why am I sticky and naked? Did I miss something fun? A s=\r\nexy mistake. Um, is this the boring, peaceful kind of taking to the streets=\r\n? Well, then good news! It's a suppository.\r\n\r\nYou know the worst thing about being a slave? They make you work, but they\r\ndon't pay you or let you go. Oh yeah, good luck with that. This is the wors=\r\nt kind of discrimination: the kind against me! Kids don't turn rotten just\r\nfrom watching TV.\r\n", "date": "2016-05-09T20:25:19.000000", "importance_level": 90, "from_": "zoidberg@caliopen.local", "size": 1277, "external_message_id": "<20141215172515.GF23183@caliopen.local>", "message_id": "bb2e2546-2332-483e-9ff7-39635e7e30b6", "subject": "Re: Dr. Zoidberg, that doesn't make sense. But, okay!"}]},
    }
  };

  const contactColl = {"total": 4, "contacts": [{"family_name": "bender", "tags": null, "given_name": null, "contact_id": "92d3727a-eefc-4537-b879-85f1c9d197bb", "title": "bender"}, {"family_name": "zoidberg", "tags": null, "given_name": null, "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "title": "zoidberg"}, {"family_name": "Doe", "tags": null, "given_name": "John", "contact_id": "19c3ce42-e3ba-46e7-984f-4c3e8de11c05", "title": "John Doe"}, {"family_name": "test", "tags": null, "given_name": null, "contact_id": "1039cdcc-1f6f-4b5d-9c8a-5d7c711f357f", "title": "test"}]};
  const contactById = {
    '92d3727a-eefc-4537-b879-85f1c9d197bb': {"contacts": {"addresses": [], "privacy_features": {}, "phones": [], "contact_id": "92d3727a-eefc-4537-b879-85f1c9d197bb", "date_insert": "2016-05-09T15:01:42.381000", "identities": [], "user_id": "344489c3-fc63-4e41-b490-5f4dd317aa50", "title": "bender", "additional_name": null, "date_update": null, "organizations": [], "ims": [], "given_name": null, "name_prefix": null, "tags": [], "deleted": 0, "privacy_index": 0, "groups": [], "infos": {}, "emails": [{"is_primary": 0, "date_update": null, "label": null, "address": "bender@caliopen.local", "date_insert": "2016-05-09T15:01:42.116000", "type": "other"}], "family_name": "bender", "name_suffix": null, "avatar": "avatar.png", "public_keys": []}},
    '0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0': {"contacts": {"addresses": [], "privacy_features": {}, "phones": [], "contact_id": "0ba2e346-e4f8-4c45-9adc-eeb1d42f07e0", "date_insert": "2016-05-09T15:01:43.381000", "identities": [], "user_id": "344489c3-fc63-4e41-b490-5f4dd317aa50", "title": "zoidberg", "additional_name": null, "date_update": null, "organizations": [], "ims": [], "given_name": null, "name_prefix": null, "tags": [], "deleted": 0, "privacy_index": 0, "groups": [], "infos": {}, "emails": [{"is_primary": 0, "date_update": null, "label": null, "address": "zoidberg@caliopen.local", "date_insert": "2016-05-09T15:01:43.116000", "type": "other"}], "family_name": "zoidberg", "name_suffix": null, "avatar": "avatar.png", "public_keys": []}},
  }
  const me = {"family_name": null, "user_id": "344489c3-fc63-4e41-b490-5f4dd317aa50", "name": "test@caliopen.local", "privacy_features": {}, "main_user_id": null, "privacy_index": 0, "date_insert": "2016-05-09T15:01:39.924000", "contact": {"addresses": [], "privacy_features": {}, "phones": [], "contact_id": "19c3ce42-e3ba-46e7-984f-4c3e8de11c05", "date_insert": "2016-05-09T15:01:40.034000", "identities": [], "user_id": "344489c3-fc63-4e41-b490-5f4dd317aa50", "title": "John Doe", "additional_name": null, "date_update": null, "organizations": [], "ims": [], "given_name": "John", "name_prefix": null, "tags": [], "deleted": 0, "privacy_index": 0, "groups": [], "infos": {}, "emails": [], "family_name": "Doe", "name_suffix": null, "avatar": "avatar.png", "public_keys": []}, "params": {}, "given_name": null};

  $httpBackend.whenRoute('GET', `${ApiUrl}/me`).respond(me);

  $httpBackend.whenRoute('GET', `${ApiUrl}/threads/:thread_id/messages`).respond((method, url, data, headers, params) => {
    if (!threadById.messages[params.thread_id]) {
      return internalServerErrorResponse;
    }

    return [200, threadById.messages[params.thread_id]];
  });
  $httpBackend.whenRoute('GET', `${ApiUrl}/threads/:thread_id`).respond((method, url, data, headers, params) => {
    if (!threadById.messages[params.thread_id]) {
      return internalServerErrorResponse;
    }

    return [200, threadById.threads[params.thread_id]];
  });
  $httpBackend.whenRoute('GET', `${ApiUrl}/threads`).respond(threadColl);

  $httpBackend.whenRoute('GET', `${ApiUrl}/contacts/:contact_id`).respond((method, url, data, headers, params) => {
    if (!contactById[params.contact_id]) {
      return internalServerErrorResponse;
    }

    return [200, contactById[params.contact_id]];
  });
  $httpBackend.whenRoute('GET', `${ApiUrl}/contacts`).respond(contactColl);

  $httpBackend.whenGET(/.*/).passThrough();

  $httpBackend.whenRoute('POST', `${ApiUrl}/contacts/:contact_id/emails`)
    .respond((method, url, data, headers, params) => {
      const payload = JSON.parse(data);

      const currentContact = contactById[params.contact_id];

      if (!currentContact) {
        return internalServerErrorResponse;
      }

      if (payload.address === 'foo@bar') {
        return internalServerErrorResponse;
      }

      if (!payload.type) {
        return [400, {"status": "error", "errors": [{"location": "body", "name": "type", "description": "type is missing"}]}];
      }

      const email = Object.assign({
        "email_id": uuidV1(),
        "is_primary": 0,
        "date_update": null,
        "label": null,
        "date_insert": Date.now(),
        "address": undefined,
        "type": undefined,
      }, payload);

      currentContact.contacts.emails.push(email);

      return [201, { "addresses": email }];
    });
  $httpBackend.whenPOST(/.*/).passThrough();

  $httpBackend.whenRoute('DELETE', `${ApiUrl}/contacts/:contact_id/emails/:email_id`)
    .respond((method, url, data, headers, params) => {
      const currentContact = contactById[params.contact_id];

      if (!currentContact) {
        return internalServerErrorResponse;
      }

      const emailToDel = currentContact.contacts.emails.find((email) => email.email_id === params.email_id);

      if (!emailToDel) {
        return internalServerErrorResponse;
      }

      currentContact.contacts.emails = currentContact.contacts.emails.filter((email) => email.email_id !== params.email_id);

      return [201, {"result": "ok"}];
    });
  $httpBackend.whenDELETE(/.*/).passThrough();
});
/* eslint-enable */
