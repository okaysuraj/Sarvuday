// Generated from FastAPI. Run npm run api:generate; do not edit by hand.
export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Root */
        get: operations["root__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/analytics/counsellors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get counsellor analytics. Admin Authentication Required to access this route */
        get: operations["get_counsellor_analytics_admin_analytics_counsellors_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/analytics/platform": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get platform-wide analytics. Admin Authentication Required to access this route */
        get: operations["get_platform_analytics_admin_analytics_platform_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/analytics/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user analytics. Admin Authentication Required to access this route */
        get: operations["get_user_analytics_admin_analytics_users_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/anonymize/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Anonymize User Data */
        post: operations["anonymize_user_data_admin_anonymize__user_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/counsellors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List counsellors with filters. Admin Authentication Required to access this route */
        get: operations["list_counsellors_admin_counsellors_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/counsellors/approve/{counsellor_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Approve counsellor account. Admin Authentication Required to access this route */
        post: operations["approve_counsellor_admin_counsellors_approve__counsellor_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/counsellors/disapprove/{counsellor_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Disapprove counsellor account. Admin Authentication Required to access this route */
        post: operations["disapprove_counsellor_admin_counsellors_disapprove__counsellor_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/dashboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get admin dashboard overview. Admin Authentication Required to access this route */
        get: operations["get_admin_dashboard_admin_dashboard_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/dashboard/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get admin profile. Admin Authentication Required to access this route */
        get: operations["get_admin_profile_admin_dashboard_profile_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update admin profile. Admin Authentication Required to access this route */
        patch: operations["update_admin_profile_admin_dashboard_profile_patch"];
        trace?: never;
    };
    "/admin/disorders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all disorders */
        get: operations["list_disorders_admin_disorders_get"];
        put?: never;
        /** Add new disorder. Admin Authentication Required to access this route */
        post: operations["add_disorder_admin_disorders_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/disorders/{disorder_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update disorder. Admin Authentication Required to access this route */
        patch: operations["update_disorder_admin_disorders__disorder_id__patch"];
        trace?: never;
    };
    "/admin/disorders/bulk": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Add new disorders in bulk using JSON file. Admin Authentication Required to access this route */
        post: operations["bulk_create_disorders_admin_disorders_bulk_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/management": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List admins with filters. Admin Authentication Required to access this route */
        get: operations["list_admins_admin_management_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/management/{admin_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** delete admin account. Super Admin Authentication Required to access this route */
        delete: operations["delete_admin_admin_management__admin_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/management/add": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Super admin can add new admins. Super Admin Authentication Required to access this route */
        post: operations["create_admin_admin_management_add_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/moderation/{item_id}/action": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Apply Moderation Action */
        post: operations["apply_moderation_action_admin_moderation__item_id__action_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/moderation/crisis-logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Crisis Logs */
        get: operations["get_crisis_logs_admin_moderation_crisis_logs_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/moderation/queue": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Moderation Queue */
        get: operations["get_moderation_queue_admin_moderation_queue_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/right-to-delete/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Right To Delete User */
        delete: operations["right_to_delete_user_admin_right_to_delete__user_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete all the completed counselling sessions rooms */
        delete: operations["delete_counselling_session_rooms_admin_sessions_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/sessions/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete counselling session room with session id */
        delete: operations["delete_session_rooms_admin_sessions__session_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List normal users with filters. Admin Authentication Required to access this route */
        get: operations["list_normal_users_admin_users_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai-insights/crisis-alert": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Trigger Crisis Alert */
        post: operations["trigger_crisis_alert_ai_insights_crisis_alert_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai-insights/sentiment-analysis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Analyze Sentiment */
        post: operations["analyze_sentiment_ai_insights_sentiment_analysis_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai-insights/summary": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Ai Summary */
        get: operations["get_ai_summary_ai_insights_summary_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai-insights/voice-analysis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Analyze Voice Tone */
        post: operations["analyze_voice_tone_ai_insights_voice_analysis_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/chat": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Send a message to the AI chatbot
         * @description Send a message and get an AI response.
         *     If session_id is not provided, a new session is created.
         */
        post: operations["ai_chat_ai_chat_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/chat/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get chat history for a specific AI session
         * @description Returns the conversation messages for a session.
         */
        get: operations["get_ai_chat_history_ai_chat__session_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/match-counsellor": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Match user with counsellors based on detected emotions
         * @description Match user to counsellors based on the user's primary concerns
         *     and chat session emotion data. Uses specialization-based matching.
         */
        get: operations["match_counsellor_ai_match_counsellor_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all AI chat sessions for the current user
         * @description Returns a list of session objects for the sidebar.
         */
        get: operations["list_ai_sessions_ai_sessions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/sessions/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete an AI chat session */
        delete: operations["delete_ai_session_ai_sessions__session_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/sessions/{session_id}/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get chat history for mobile client compatibility
         * @description Returns the conversation messages for a session.
         */
        get: operations["get_ai_chat_history_ai_sessions__session_id__history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/bdi": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get BDI assessment questions
         * @description Retrieve all questions for Beck Depression Inventory (BDI) assessment
         */
        get: operations["get_bdi_data_assessments_bdi_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/hdrs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get HDRS assessment questions
         * @description Retrieve all questions for Hamilton Depression Rating Scale (HDRS) assessment
         */
        get: operations["get_hdrs_data_assessments_hdrs_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/phq9": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get PHQ-9 assessment questions
         * @description Retrieve all questions for Patient Health Questionnaire-9 (PHQ-9) assessment
         */
        get: operations["get_phq9_data_assessments_phq9_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/score/bdi": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Calculate BDI score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.
         * @description Calculate and store Beck Depression Inventory (BDI) score
         */
        post: operations["bdi_score_assessments_score_bdi_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/score/comprehensive": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get comprehensive assessment scores. Authentication required (Admin/Counsellor/Normal User)
         * @description Get comprehensive assessment results for authenticated user.
         *
         *     Returns:
         *     - Most recent scores for BDI, PHQ-9, and HDRS assessments
         *     - Timestamp of last update
         *     - None for assessments not completed
         */
        get: operations["get_comprehensive_scores_assessments_score_comprehensive_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/score/hdrs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Calculate HDRS score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.
         * @description Calculate and store Hamilton Depression Rating Scale (HDRS) score
         */
        post: operations["hdrs_score_assessments_score_hdrs_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/assessments/score/phq9": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Calculate PHQ-9 score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.
         * @description Calculate and store Patient Health Questionnaire-9 (PHQ-9) score
         */
        post: operations["phq9_score_assessments_score_phq9_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/firebase-login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Login via Firebase (Email/Phone/Google)
         * @description Authenticate using a Firebase ID token from email, phone, or Google sign-in.
         */
        post: operations["firebase_login_auth_firebase_login_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/firebase-register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register a new user via Firebase (Email/Phone/Google)
         * @description Register using a Firebase ID token from email, phone, or Google sign-up.
         */
        post: operations["firebase_register_auth_firebase_register_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chat/rooms": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get chat rooms */
        get: operations["get_chat_rooms_chat_rooms_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chat/rooms/{room_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get chat history */
        get: operations["get_chat_history_chat_rooms__room_id__messages_get"];
        put?: never;
        /** Save message via REST */
        post: operations["create_message_chat_rooms__room_id__messages_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/feed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get General Feed */
        get: operations["get_general_feed_community_feed_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Support Groups */
        get: operations["get_support_groups_community_groups_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/groups/{group_id}/feed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Group Feed */
        get: operations["get_group_feed_community_groups__group_id__feed_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Post */
        post: operations["create_post_community_posts_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/community/posts/{post_id}/interact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Interact With Post */
        post: operations["interact_with_post_community_posts__post_id__interact_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/contact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit a contact form
         * @description Persist the request before acknowledging receipt.
         */
        post: operations["submit_contact_form_contact_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/content/counsellors": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Counsellors */
        get: operations["get_counsellors_content_counsellors_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/content/counsellors/{counsellor_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Counsellor */
        get: operations["get_counsellor_content_counsellors__counsellor_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/content/counsellors/{counsellor_id}/reviews": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Counsellor Reviews */
        get: operations["get_counsellor_reviews_content_counsellors__counsellor_id__reviews_get"];
        put?: never;
        /** Submit Counsellor Review */
        post: operations["submit_counsellor_review_content_counsellors__counsellor_id__reviews_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/content/disorders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List disorders */
        get: operations["list_disorders_content_disorders_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/appointments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all scheduled appointments. Counsellor Authentication required */
        get: operations["get_appointments_counsellor_appointments_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/appointments/{appointment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get appointment details  by appointment ID. Counsellor Authentication required */
        get: operations["get_appointment_details_counsellor_appointments__appointment_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/appointments/cancel/{appointment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Cancel an appointment. Counsellor Authentication required */
        patch: operations["cancel_appointment_counsellor_appointments_cancel__appointment_id__patch"];
        trace?: never;
    };
    "/counsellor/availability": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get availability slots. Counsellor Authentication required */
        get: operations["get_availability_counsellor_availability_get"];
        put?: never;
        /** Add availability slot. Counsellor Authentication required */
        post: operations["add_availability_counsellor_availability_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/availability/{slot_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Remove availability slot. Counsellor Authentication required */
        delete: operations["remove_availability_counsellor_availability__slot_id__delete"];
        options?: never;
        head?: never;
        /** Update availability slot. Counsellor Authentication required */
        patch: operations["update_availability_counsellor_availability__slot_id__patch"];
        trace?: never;
    };
    "/counsellor/dashboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get counsellor dashboard. Counsellor Authentication required */
        get: operations["get_dashboard_counsellor_dashboard_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/dashboard/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get counsellor profile. Counsellor Authentication required */
        get: operations["get_profile_counsellor_dashboard_profile_get"];
        put?: never;
        post?: never;
        /** delete counsellor account. Counsellor Authentication required */
        delete: operations["delete_counsellor_counsellor_dashboard_profile_delete"];
        options?: never;
        head?: never;
        /** Update profile. Counsellor Authentication required */
        patch: operations["update_profile_counsellor_dashboard_profile_patch"];
        trace?: never;
    };
    "/counsellor/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get payment history. Counsellor Authentication required */
        get: operations["get_payments_counsellor_payments_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/payments/{payment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get payment details by payment ID. Counsellor Authentication required */
        get: operations["get_payment_details_counsellor_payments__payment_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/prescriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Generate prescription. Counsellor Authentication required */
        post: operations["create_prescription_counsellor_prescriptions_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/prescriptions/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user's prescriptions. Counsellor Authentication required */
        get: operations["get_prescriptions_counsellor_prescriptions__user_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/sessions/delete/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete counselling session room. Specifically hit this endpoint after the counselling ended */
        delete: operations["delete_session_rooms_counsellor_sessions_delete__session_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/counsellor/sessions/join/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Join counselling session. Counsellor Authentication required */
        get: operations["join_session_counsellor_sessions_join__session_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/exercises/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Exercises */
        get: operations["get_exercises_exercises__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/exercises/{exercise_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Exercise By Id */
        get: operations["get_exercise_by_id_exercises__exercise_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all notifications for the current user */
        get: operations["get_notifications_notifications_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notifications/{notification_id}/read": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Mark a notification as read */
        patch: operations["mark_notification_read_notifications__notification_id__read_patch"];
        trace?: never;
    };
    "/payments/create-intent": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Payment Intent */
        post: operations["create_payment_intent_payments_create_intent_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/payments/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Payment History */
        get: operations["get_payment_history_payments_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/payments/wallet": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Wallet */
        get: operations["get_wallet_payments_wallet_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/payments/wallet/topup": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Topup Wallet */
        post: operations["topup_wallet_payments_wallet_topup_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/appointments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all user appointments. Normal User Authentication required */
        get: operations["list_appointments_user_appointments_get"];
        put?: never;
        /** Book appointment with counsellor. Normal User Authentication required */
        post: operations["book_appointment_user_appointments_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/appointments/{appointment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get appointment details by appointment ID. Normal User Authentication required */
        get: operations["get_appointment_user_appointments__appointment_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/appointments/cancel/{appointment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Cancel appointment by appointment ID. Normal User Authentication required */
        patch: operations["cancel_appointment_user_appointments_cancel__appointment_id__patch"];
        trace?: never;
    };
    "/user/appointments/slots": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get available slots. Normal User Authentication required */
        get: operations["get_available_slots_user_appointments_slots_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all chat sessions. Normal User Authentication required */
        get: operations["list_sessions_user_chatbot_get"];
        put?: never;
        /** Start new chat session. Normal User Authentication required */
        post: operations["create_session_user_chatbot_post"];
        /** Delete all chat sessions */
        delete: operations["delete_all_sessions_user_chatbot_delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get session details by session ID. Normal User Authentication required */
        get: operations["get_session_user_chatbot__session_id__get"];
        put?: never;
        post?: never;
        /** Delete a chat session using ID. Normal User Authentication required */
        delete: operations["delete_session_user_chatbot__session_id__delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot/history/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get chat history of a session by session ID. Normal User Authentication required */
        get: operations["get_session_history_user_chatbot_history__session_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot/inference/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Get Chatbot Inference. Normal User Authentication required */
        post: operations["chat_inference_user_chatbot_inference__session_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot/inference/stream/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Stream Chat Endpoint */
        post: operations["stream_chat_endpoint_user_chatbot_inference_stream__session_id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/chatbot/title/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update chat session title. Normal User Authentication required */
        patch: operations["update_title_user_chatbot_title__session_id__patch"];
        trace?: never;
    };
    "/user/dashboard": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user dashboard overview. Normal User Authentication required */
        get: operations["get_dashboard_user_dashboard_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/dashboard/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get user profile. Normal User Authentication required */
        get: operations["get_profile_user_dashboard_profile_get"];
        put?: never;
        post?: never;
        /** Delete Users Account. Normal User Authentication required */
        delete: operations["delete_account_user_dashboard_profile_delete"];
        options?: never;
        head?: never;
        /** Update user profile. Normal User Authentication required */
        patch: operations["update_profile_user_dashboard_profile_patch"];
        trace?: never;
    };
    "/user/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Payment history. Normal User Authentication required */
        get: operations["payment_history_user_payments_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/payments/{payment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Payment details by Payment ID. Normal User Authentication required */
        get: operations["payment_details_user_payments__payment_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/payments/initiate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Initiate a payment to confirm counselling booking. Normal User Authentication required */
        post: operations["initiate_payment_user_payments_initiate_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/payments/verify": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Verify the initiated payment to confirm booking. Normal User Authentication required */
        post: operations["verify_payment_user_payments_verify_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/prescriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List prescriptions. Normal User Authentication required */
        get: operations["list_prescriptions_user_prescriptions_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/prescriptions/{prescription_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get prescription by prescription ID. Normal User Authentication required */
        get: operations["get_prescription_user_prescriptions__prescription_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/sessions/join/{session_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Join counselling session. Normal User Authentication required */
        get: operations["join_session_user_sessions_join__session_id__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/therapists/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Therapists */
        get: operations["get_therapists_user_therapists__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/biofeedback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Biofeedback */
        get: operations["get_biofeedback_user_tracking_biofeedback_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/correlation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Correlation Data */
        get: operations["get_correlation_data_user_tracking_correlation_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/goals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Goals */
        get: operations["get_goals_user_tracking_goals_get"];
        put?: never;
        /** Create Goal */
        post: operations["create_goal_user_tracking_goals_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/goals/{goal_id}/increment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Increment Goal */
        patch: operations["increment_goal_user_tracking_goals__goal_id__increment_patch"];
        trace?: never;
    };
    "/user/tracking/journal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Journal Entries */
        get: operations["get_journal_entries_user_tracking_journal_get"];
        put?: never;
        /** Submit Journal */
        post: operations["submit_journal_user_tracking_journal_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/medications": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Medications */
        get: operations["get_medications_user_tracking_medications_get"];
        put?: never;
        /** Add Medication */
        post: operations["add_medication_user_tracking_medications_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/medications/{med_id}/toggle": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Toggle Medication */
        patch: operations["toggle_medication_user_tracking_medications__med_id__toggle_patch"];
        trace?: never;
    };
    "/user/tracking/mood": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Log Mood */
        post: operations["log_mood_user_tracking_mood_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/mood/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Mood History */
        get: operations["get_mood_history_user_tracking_mood_history_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/tracking/sleep": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Sleep History */
        get: operations["get_sleep_history_user_tracking_sleep_get"];
        put?: never;
        /** Log Sleep */
        post: operations["log_sleep_user_tracking_sleep_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** AddAvailabilitySlot */
        AddAvailabilitySlot: {
            /**
             * End Time
             * Format: date-time
             */
            end_time: string;
            /** Notes */
            notes?: string | null;
            /**
             * Start Time
             * Format: date-time
             */
            start_time: string;
            /** @default available */
            status?: components["schemas"]["CounsellorAvailabilityStatusEnum"] | null;
        };
        /** AdminBase */
        AdminBase: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Email
             * Format: email
             */
            email: string;
            gender?: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Approved
             * @default true
             */
            is_approved?: boolean;
            /**
             * Is Email Verified
             * @default false
             */
            is_email_verified?: boolean;
            /**
             * Is Phone Verified
             * @default false
             */
            is_phone_verified?: boolean;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Profile Pic */
            profile_pic?: string | null;
            role: components["schemas"]["AdminRoleEnum"];
            /** User Id */
            user_id: string;
            /** @default admin */
            user_type?: components["schemas"]["UserTypeEnum"];
        };
        /** AdminCreate */
        AdminCreate: {
            /**
             * Email
             * Format: email
             */
            email: string;
            gender: components["schemas"]["GenderEnum"];
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** @default moderator */
            role?: components["schemas"]["AdminRoleEnum"];
            user_type: components["schemas"]["UserTypeEnum"];
        };
        /** AdminCreateResponse */
        AdminCreateResponse: {
            /** Message */
            message: string;
            /** Status */
            status: string;
            user: components["schemas"]["AdminBase"];
        };
        /** AdminListResponse */
        AdminListResponse: {
            /** Admins */
            admins: components["schemas"]["AdminBase"][];
            /** Total */
            total: number;
        };
        /**
         * AdminRoleEnum
         * @enum {string}
         */
        AdminRoleEnum: "super_admin" | "moderator" | "auditor" | "support";
        /** AdminUpdateResponse */
        AdminUpdateResponse: {
            admin: components["schemas"]["AdminBase"];
            /** Message */
            message: string;
        };
        /** AIChatRequest */
        AIChatRequest: {
            /** Message */
            message: string;
            /** Session Id */
            session_id?: string | null;
        };
        /** AIChatResponse */
        AIChatResponse: {
            /** Is Crisis */
            is_crisis?: boolean | null;
            /** Reply */
            reply: string;
            /** Session Id */
            session_id: string;
        };
        /** AIMatchedCounsellor */
        AIMatchedCounsellor: {
            /** Match Score */
            match_score: string;
            /** Name */
            name: string;
            /** Specialization */
            specialization: string;
        };
        /** AIMatchResponse */
        AIMatchResponse: {
            /** Matches */
            matches: components["schemas"]["AIMatchedCounsellor"][];
        };
        /** AppointmentBase */
        AppointmentBase: {
            /** Appointment Id */
            appointment_id: string;
            /** Availability Slot Id */
            availability_slot_id: string;
            counsellor: components["schemas"]["CounsellorAppointmentView"];
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Payment Id */
            payment_id?: string | null;
            /** Reason */
            reason?: string | null;
            session: components["schemas"]["SessionAppointmentView"];
            status: components["schemas"]["AppointmentStatusEnum"];
            user: components["schemas"]["NormalUserAppointmentView"];
        };
        /** AppointmentListResponse */
        AppointmentListResponse: {
            /** Appointments */
            appointments: components["schemas"]["AppointmentBase"][];
            /** Total Count */
            total_count: number;
        };
        /**
         * AppointmentStatusEnum
         * @enum {string}
         */
        AppointmentStatusEnum: "pending" | "confirmed" | "cancelled" | "completed" | "rescheduled";
        /** ApproveCounsellorResponse */
        ApproveCounsellorResponse: {
            counsellor: components["schemas"]["CounsellorBase"];
            /** Message */
            message: string;
        };
        /** AssessmentSchema */
        AssessmentSchema: {
            /** Questions */
            questions: components["schemas"]["QuestionSchema"][];
            /** Total Count */
            total_count: number;
        };
        /** AvailableSlot */
        AvailableSlot: {
            /** Availability Slot Id */
            availability_slot_id: string;
            /** Counsellor Id */
            counsellor_id: string;
            /**
             * End Time
             * Format: date-time
             */
            end_time: string;
            /** Notes */
            notes?: string | null;
            /**
             * Start Time
             * Format: date-time
             */
            start_time: string;
            status: components["schemas"]["CounsellorAvailabilityStatusEnum"];
        };
        /** AvailableSlotsResponse */
        AvailableSlotsResponse: {
            /** Slots */
            slots: components["schemas"]["AvailableSlot"][];
        };
        /** BiofeedbackResponse */
        BiofeedbackResponse: {
            /** Calmness Trend */
            calmness_trend: unknown[];
            /** Cortisol Spike */
            cortisol_spike: number | null;
            /** Daily Steps */
            daily_steps: number | null;
            /** Heart Rate */
            heart_rate: number | null;
            /** Hrv */
            hrv: number | null;
            /** Measured At */
            measured_at: string | null;
            /** Recent Arousal */
            recent_arousal: number | null;
            /** Sleep Score */
            sleep_score: number | null;
            /** Source */
            source: string | null;
            /**
             * Status
             * @enum {string}
             */
            status: "success" | "no_data";
            /** Stress Level */
            stress_level: number | null;
            /** Stress Threshold */
            stress_threshold: number | null;
        };
        /** Body_bulk_create_disorders_admin_disorders_bulk_post */
        Body_bulk_create_disorders_admin_disorders_bulk_post: {
            /** File */
            file: string;
        };
        /** Body_update_admin_profile_admin_dashboard_profile_patch */
        Body_update_admin_profile_admin_dashboard_profile_patch: {
            /** Name */
            name?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            /** Profile Pic */
            profile_pic?: string | null;
        };
        /** Body_update_profile_counsellor_dashboard_profile_patch */
        Body_update_profile_counsellor_dashboard_profile_patch: {
            /** Address */
            address?: string | null;
            /** Bio */
            bio?: string | null;
            /** Certifications */
            certifications?: string | null;
            /** City */
            city?: string | null;
            /** Country */
            country?: string | null;
            /** Education Qualifications */
            education_qualifications?: string | null;
            /** Experience Years */
            experience_years?: number | null;
            gender?: components["schemas"]["GenderEnum"] | null;
            /** Identity Proof Url */
            identity_proof_url?: string | null;
            /** Languages */
            languages?: string | null;
            /** License Expiry Date */
            license_expiry_date?: string | null;
            /** License Issuing Authority */
            license_issuing_authority?: string | null;
            /** License Number */
            license_number?: string | null;
            /** License Proof Url */
            license_proof_url?: string | null;
            /** Name */
            name?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            /** Pincode */
            pincode?: string | null;
            /** Profile Pic */
            profile_pic?: string | null;
            /** Session Duration */
            session_duration?: number | null;
            /** Session Fee */
            session_fee?: number | null;
            /** Specializations */
            specializations?: string | null;
            /** State */
            state?: string | null;
        };
        /** Body_update_profile_user_dashboard_profile_patch */
        Body_update_profile_user_dashboard_profile_patch: {
            /** Address */
            address?: string | null;
            /** Age Range */
            age_range?: string | null;
            /** Bio */
            bio?: string | null;
            /** City */
            city?: string | null;
            /** Country */
            country?: string | null;
            /** Dob */
            dob?: string | null;
            /** Emergency Contact Name */
            emergency_contact_name?: string | null;
            /** Emergency Contact Phone */
            emergency_contact_phone?: string | null;
            /** Emergency Contact Relation */
            emergency_contact_relation?: string | null;
            gender?: components["schemas"]["GenderEnum"] | null;
            /** Mental Health History */
            mental_health_history?: string | null;
            /** Name */
            name?: string | null;
            /** Phone Number */
            phone_number?: string | null;
            /** Pincode */
            pincode?: string | null;
            /** Preferred Languages */
            preferred_languages?: string | null;
            /** Primary Concerns */
            primary_concerns?: string | null;
            /** Profile Pic */
            profile_pic?: string | null;
            /** State */
            state?: string | null;
            /** Stress Factors */
            stress_factors?: string | null;
            /** Symptoms */
            symptoms?: string | null;
            /** Therapy Goals */
            therapy_goals?: string | null;
            /** Timezone */
            timezone?: string | null;
        };
        /** CancelAppointmentResponse */
        CancelAppointmentResponse: {
            /** Appointment Id */
            appointment_id: string;
            /**
             * Cancelled At
             * Format: date-time
             */
            cancelled_at: string;
            /** Message */
            message: string;
            /** Refund Payment Id */
            refund_payment_id?: string | null;
            /**
             * Refund Status
             * @default pending
             */
            refund_status?: string;
        };
        /** ChatHistoryResponse */
        ChatHistoryResponse: {
            /** Conversation History */
            conversation_history: components["schemas"]["ConversationMessage"][];
            /** Session Id */
            session_id: string;
            /** User Id */
            user_id: string;
        };
        /** ChatRequest */
        ChatRequest: {
            /** User Input */
            user_input: string;
        };
        /** ChatResponse */
        ChatResponse: {
            /** Response */
            response: string;
        };
        /** ChatSessionCreateRequest */
        ChatSessionCreateRequest: {
            /** Title */
            title?: string | null;
        };
        /** ChatSessionListResponse */
        ChatSessionListResponse: {
            /** Chat Sessions */
            chat_sessions: components["schemas"]["ChatSessionResponse"][];
            /** Total Count */
            total_count: number;
        };
        /** ChatSessionResponse */
        ChatSessionResponse: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Emotions Detected */
            emotions_detected?: {
                [key: string]: number;
            } | null;
            /**
             * Is Crisis
             * @default false
             */
            is_crisis?: boolean;
            /** Message Count */
            message_count: number;
            /** Session Id */
            session_id: string;
            /** Title */
            title: string | null;
        };
        /**
         * CommissionTypeEnum
         * @enum {string}
         */
        CommissionTypeEnum: "low" | "medium" | "high";
        /** CommunityPostResponse */
        CommunityPostResponse: {
            /** Content */
            content: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Group Id */
            group_id: string;
            /** Has Trigger Warning */
            has_trigger_warning: boolean;
            /** Hugs */
            hugs: number;
            /** Id */
            id: string;
            /** Is Anonymous */
            is_anonymous: boolean;
            /** Likes */
            likes: number;
            /** Relates */
            relates: number;
        };
        /** ComprehensiveScoreResponse */
        ComprehensiveScoreResponse: {
            bdi?: components["schemas"]["ScoreResponseSchema"] | null;
            hdrs?: components["schemas"]["ScoreResponseSchema"] | null;
            /** Last Updated */
            last_updated?: string | null;
            phq9?: components["schemas"]["ScoreResponseSchema"] | null;
        };
        /** ContactFormRequest */
        ContactFormRequest: {
            /**
             * Email
             * Format: email
             */
            email: string;
            /** Message */
            message: string;
            /** Name */
            name: string;
            /** Subject */
            subject: string;
        };
        /** ContactFormResponse */
        ContactFormResponse: {
            /** Message */
            message: string;
            /** Status */
            status: string;
        };
        /** ConversationMessage */
        ConversationMessage: {
            /** Assistant */
            assistant: string;
            /**
             * Timestamp
             * Format: date-time
             */
            timestamp: string;
            /** User */
            user: string;
        };
        /** CorrelationPoint */
        CorrelationPoint: {
            /**
             * Date
             * Format: date
             */
            date: string;
            /** Day */
            day: string;
            /** Mood */
            mood: number | null;
            /** Sleep */
            sleep: number;
        };
        /** CorrelationResponse */
        CorrelationResponse: {
            /** Correlation */
            correlation: number | null;
            /** Data Points */
            data_points: components["schemas"]["CorrelationPoint"][];
            /** Insight */
            insight: string;
            /** Matched Days */
            matched_days: number;
            /** Mood Consistency */
            mood_consistency?: number | null;
            /** Mood Scale */
            mood_scale: {
                [key: string]: number;
            };
            /** Sleep Quality Trend */
            sleep_quality_trend?: number | null;
            /**
             * Status
             * @enum {string}
             */
            status: "success" | "no_data";
        };
        /** CounsellingSessionJoinResponse */
        CounsellingSessionJoinResponse: {
            /** Message */
            message: string;
            /** Token */
            token: string;
            /** Video Url */
            video_url: string;
        };
        /** CounsellingSessionResponse */
        CounsellingSessionResponse: {
            /** Counsellor Id */
            counsellor_id: string;
            /** Session Expires At */
            session_expires_at?: string | null;
            /** Session Id */
            session_id: string;
            /**
             * Session Scheduled At
             * Format: date-time
             */
            session_scheduled_at: string;
        };
        /**
         * CounsellorAdminView
         * @description License metadata is available to reviewers, not the public directory.
         */
        CounsellorAdminView: {
            /**
             * Average Rating
             * @default 0
             */
            average_rating?: number;
            /** Bio */
            bio: string | null;
            /** Certifications */
            certifications: string[] | null;
            /** City */
            city: string | null;
            /** Country */
            country: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Education Qualifications */
            education_qualifications: string[] | null;
            /** Email */
            email?: string | null;
            /**
             * Experience Years
             * @default 0
             */
            experience_years?: number | null;
            gender: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Approved
             * @default false
             */
            is_approved?: boolean;
            /**
             * Is Email Verified
             * @default false
             */
            is_email_verified?: boolean;
            /**
             * Is Featured
             * @default false
             */
            is_featured?: boolean;
            /**
             * Is Phone Verified
             * @default false
             */
            is_phone_verified?: boolean;
            /** Languages */
            languages: string[] | null;
            /** License Expiry Date */
            license_expiry_date?: string | null;
            /** License Issuing Authority */
            license_issuing_authority?: string | null;
            /** License Number */
            license_number?: string | null;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Profile Pic */
            profile_pic: string | null;
            /**
             * Session Duration
             * @default 0
             */
            session_duration?: number | null;
            /**
             * Session Fee
             * @default 0
             */
            session_fee?: number | null;
            /** Specializations */
            specializations: string[] | null;
            /** State */
            state: string | null;
            /**
             * Total Reviews
             * @default 0
             */
            total_reviews?: number;
            /** User Id */
            user_id: string;
        };
        /** CounsellorAnalytics */
        CounsellorAnalytics: {
            /** Performance */
            performance: {
                [key: string]: unknown;
            };
            /** Sessions */
            sessions: number;
            /** Specialties */
            specialties: {
                [key: string]: number;
            };
            /** Status */
            status: {
                [key: string]: number;
            };
        };
        /** CounsellorAppointmentView */
        CounsellorAppointmentView: {
            /**
             * Average Rating
             * @default 0
             */
            average_rating?: number;
            gender?: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Featured
             * @default false
             */
            is_featured?: boolean;
            /** Name */
            name: string;
            /** Profile Pic */
            profile_pic?: string | null;
            /**
             * Total Reviews
             * @default 0
             */
            total_reviews?: number;
            /** User Id */
            user_id: string;
        };
        /**
         * CounsellorAvailabilityStatusEnum
         * @enum {string}
         */
        CounsellorAvailabilityStatusEnum: "available" | "unavailable" | "booked" | "on_leave";
        /** CounsellorBase */
        CounsellorBase: {
            /**
             * Average Rating
             * @default 0
             */
            average_rating?: number;
            /** Bio */
            bio: string | null;
            /** Certifications */
            certifications: string[] | null;
            /** City */
            city: string | null;
            /** Country */
            country: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Education Qualifications */
            education_qualifications: string[] | null;
            /** Email */
            email?: string | null;
            /**
             * Experience Years
             * @default 0
             */
            experience_years?: number | null;
            gender: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Approved
             * @default false
             */
            is_approved?: boolean;
            /**
             * Is Email Verified
             * @default false
             */
            is_email_verified?: boolean;
            /**
             * Is Featured
             * @default false
             */
            is_featured?: boolean;
            /**
             * Is Phone Verified
             * @default false
             */
            is_phone_verified?: boolean;
            /** Languages */
            languages: string[] | null;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Profile Pic */
            profile_pic: string | null;
            /**
             * Session Duration
             * @default 0
             */
            session_duration?: number | null;
            /**
             * Session Fee
             * @default 0
             */
            session_fee?: number | null;
            /** Specializations */
            specializations: string[] | null;
            /** State */
            state: string | null;
            /**
             * Total Reviews
             * @default 0
             */
            total_reviews?: number;
            /** User Id */
            user_id: string;
        };
        /** CounsellorDashboardView */
        CounsellorDashboardView: {
            /** Average Rating */
            average_rating?: number | null;
            /** Completion Rate */
            completion_rate: number;
            /** Patient Stats */
            patient_stats?: unknown | null;
            /** Profile Completion */
            profile_completion: number;
            /** Recent Payments */
            recent_payments: number;
            /** Revenue */
            revenue: number;
            /** Total Sessions */
            total_sessions: number;
            /** Upcoming Appointments */
            upcoming_appointments: number;
        };
        /** CounsellorListResponse */
        CounsellorListResponse: {
            /** Counsellors */
            counsellors: components["schemas"]["CounsellorAdminView"][];
            /**
             * Limit
             * @default 10
             */
            limit?: number;
            /**
             * Offset
             * @default 0
             */
            offset?: number;
            /** Total */
            total: number;
        };
        /** CounsellorListWebView */
        CounsellorListWebView: {
            /** Counsellors */
            counsellors: components["schemas"]["CounsellorWebView"][];
            /** Total Count */
            total_count: number;
        };
        /** CounsellorPaymentBase */
        CounsellorPaymentBase: {
            /** Appointment Id */
            appointment_id: string;
            commission_type: components["schemas"]["CommissionTypeEnum"];
            /** Counsellor Id */
            counsellor_id: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Currency
             * @default INR
             */
            currency?: string;
            /** Invoice Url */
            invoice_url?: string | null;
            /** Net Payout Amount */
            net_payout_amount: number;
            /** Payment Id */
            payment_id: string;
            /** Payout Date */
            payout_date?: string | null;
            payout_method: components["schemas"]["CounsellorPayoutMethodEnum"];
            /** @default pending */
            status?: components["schemas"]["CounsellorPayoutStatusEnum"];
            /** Transaction Id */
            transaction_id: string;
        };
        /** CounsellorPaymentListResponse */
        CounsellorPaymentListResponse: {
            /** Limit */
            limit: number;
            /** Offset */
            offset: number;
            /** Payments */
            payments: components["schemas"]["CounsellorPaymentBase"][];
            /** Total Amount */
            total_amount: number;
            /** Total Count */
            total_count: number;
        };
        /**
         * CounsellorPayoutMethodEnum
         * @enum {string}
         */
        CounsellorPayoutMethodEnum: "bank_transfer" | "cheque" | "upi";
        /**
         * CounsellorPayoutStatusEnum
         * @enum {string}
         */
        CounsellorPayoutStatusEnum: "pending" | "initiated" | "completed" | "failed";
        /** CounsellorUpdateResponse */
        CounsellorUpdateResponse: {
            counsellor: components["schemas"]["CounsellorBase"];
            /** Message */
            message: string;
        };
        /** CounsellorWebView */
        CounsellorWebView: {
            /**
             * Average Rating
             * @default 0
             */
            average_rating?: number;
            /** Bio */
            bio: string | null;
            /** Certifications */
            certifications: string[] | null;
            /** City */
            city: string | null;
            /** Country */
            country: string | null;
            /** Education Qualifications */
            education_qualifications: string[] | null;
            /**
             * Experience Years
             * @default 0
             */
            experience_years?: number | null;
            gender: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Featured
             * @default false
             */
            is_featured?: boolean;
            /** Languages */
            languages: string[] | null;
            /** Name */
            name: string;
            /** Profile Pic */
            profile_pic: string | null;
            /**
             * Session Duration
             * @default 0
             */
            session_duration?: number | null;
            /**
             * Session Fee
             * @default 0
             */
            session_fee?: number | null;
            /** Specializations */
            specializations: string[] | null;
            /** State */
            state: string | null;
            /**
             * Total Reviews
             * @default 0
             */
            total_reviews?: number;
            /** User Id */
            user_id: string;
        };
        /** CreateAppointmentRequest */
        CreateAppointmentRequest: {
            /** Availability Slot Id */
            availability_slot_id: string;
            /** Counsellor Id */
            counsellor_id: string;
            /** Payment Id */
            payment_id?: string | null;
            /** Reason */
            reason?: string | null;
        };
        /** CreateAppointmentResponse */
        CreateAppointmentResponse: {
            appointment: components["schemas"]["AppointmentBase"];
            /** Message */
            message: string;
        };
        /** CreatePaymentIntentRequest */
        CreatePaymentIntentRequest: {
            /** Availability Slot Id */
            availability_slot_id: string;
        };
        /** CreatePaymentIntentResponse */
        CreatePaymentIntentResponse: {
            /** Clientsecret */
            clientSecret: string;
            /** Payment Id */
            payment_id: string;
            /** Publishablekey */
            publishableKey: string;
        };
        /** CrisisInput */
        CrisisInput: {
            /**
             * Notes
             * @default
             */
            notes?: string;
            /**
             * Risk Level
             * @default manual
             */
            risk_level?: string;
            /**
             * Source
             * @default manual
             */
            source?: string;
        };
        /** DashboardOverviewResponse */
        DashboardOverviewResponse: {
            /** Chat Sessions Count */
            chat_sessions_count: number;
            /** Last Active */
            last_active?: string | null;
            /** Total Messages */
            total_messages: number;
            /** Total Sessions */
            total_sessions: number;
            /** Upcoming Sessions */
            upcoming_sessions: components["schemas"]["CounsellingSessionResponse"][];
            user: components["schemas"]["NormalUserBase"];
        };
        /** DisapprovalCounsellorResponse */
        DisapprovalCounsellorResponse: {
            counsellor: components["schemas"]["CounsellorBase"];
            /** Message */
            message: string;
        };
        /** DisorderBase */
        DisorderBase: {
            /** Best Advice */
            best_advice: string;
            /** Disorder Description */
            disorder_description: string;
            /** Disorder Id */
            disorder_id: number;
            /** Disorder Title */
            disorder_title: string;
            /** Preventions */
            preventions: string[];
            /** Symptoms */
            symptoms: string[];
            /** Treatments */
            treatments: string[];
        };
        /** DisorderBulkCreateResponse */
        DisorderBulkCreateResponse: {
            /** Inserted Ids */
            inserted_ids: string[];
            /** Message */
            message: string;
            /** Total Inserted */
            total_inserted: number;
        };
        /** DisorderCreate */
        DisorderCreate: {
            /** Best Advice */
            best_advice: string;
            /** Disorder Description */
            disorder_description: string;
            /** Disorder Title */
            disorder_title: string;
            /** Preventions */
            preventions: string[];
            /** Symptoms */
            symptoms: string[];
            /** Treatments */
            treatments: string[];
        };
        /** DisorderCreateResponse */
        DisorderCreateResponse: {
            /** Inserted Id */
            inserted_id: string;
            /** Message */
            message: string;
        };
        /** DisordersListResponse */
        DisordersListResponse: {
            /** Disorders */
            disorders: components["schemas"]["DisorderBase"][];
            /** Total Count */
            total_count: number;
        };
        /** DisorderUpdate */
        DisorderUpdate: {
            /** Best Advice */
            best_advice?: string | null;
            /** Disorder Description */
            disorder_description?: string | null;
            /** Disorder Title */
            disorder_title?: string | null;
            /** Preventions */
            preventions?: string[] | null;
            /** Symptoms */
            symptoms?: string[] | null;
            /** Treatments */
            treatments?: string[] | null;
        };
        /** DisorderUpdateResponse */
        DisorderUpdateResponse: {
            /** Message */
            message: string;
            /** Modified Count */
            modified_count: number;
        };
        /** FirebaseLoginRequest */
        FirebaseLoginRequest: {
            /** Id Token */
            id_token: string;
            user_type?: components["schemas"]["UserTypeEnum"] | null;
        };
        /** FirebaseRegisterRequest */
        FirebaseRegisterRequest: {
            /** @default other */
            gender?: components["schemas"]["GenderEnum"] | null;
            /** Id Token */
            id_token: string;
            /** Name */
            name: string;
            /**
             * Privacy Policy Accepted
             * @default false
             */
            privacy_policy_accepted?: boolean;
            /**
             * Terms Accepted
             * @default false
             */
            terms_accepted?: boolean;
            user_type: components["schemas"]["UserTypeEnum"];
        };
        /**
         * GenderEnum
         * @enum {string}
         */
        GenderEnum: "male" | "female" | "other";
        /** GoalCreate */
        GoalCreate: {
            /**
             * Description
             * @default
             */
            description?: string;
            /**
             * Frequency
             * @default Daily
             */
            frequency?: string;
            /**
             * Progress Total
             * @default 1
             */
            progress_total?: number;
            /** Title */
            title: string;
        };
        /** GoalProgress */
        GoalProgress: {
            /** Progress Current */
            progress_current: number;
            /**
             * Status
             * @default success
             * @constant
             */
            status?: "success";
            /** Streak */
            streak: number;
        };
        /** GoalRecord */
        GoalRecord: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Description */
            description: string;
            /** Frequency */
            frequency: string;
            /** Id */
            id: string;
            /** Progress Current */
            progress_current: number;
            /** Progress Total */
            progress_total: number;
            /** Streak */
            streak: number;
            /** Title */
            title: string;
            /** Updated At */
            updated_at: string | null;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** JournalCreate */
        JournalCreate: {
            /** Text */
            text: string;
            /** Triggers */
            triggers?: string[];
        };
        /** JournalCreated */
        JournalCreated: {
            /** Id */
            id: string;
            /** Sentiment */
            sentiment?: number | null;
            /**
             * Status
             * @default success
             * @constant
             */
            status?: "success";
        };
        /** JournalRecord */
        JournalRecord: {
            /** Ai Sentiment Score */
            ai_sentiment_score: number | null;
            /** Content */
            content: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Entry Type */
            entry_type: string;
            /** Id */
            id: string;
            /** Shared With Therapist */
            shared_with_therapist: boolean;
            /** Triggers */
            triggers: string[];
        };
        /** MedicationCreate */
        MedicationCreate: {
            /**
             * Dosage
             * @default
             */
            dosage?: string;
            /** Name */
            name: string;
            /** Refill Days */
            refill_days?: number | null;
            /**
             * Schedule
             * @default
             */
            schedule?: string;
            /**
             * Type
             * @default Prescription
             */
            type?: string;
        };
        /** MedicationRecord */
        MedicationRecord: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Dosage */
            dosage: string;
            /** Id */
            id: string;
            /** Is Taken */
            is_taken: boolean;
            /** Name */
            name: string;
            /** Refill Days */
            refill_days: number | null;
            /** Schedule */
            schedule: string;
            /** Type */
            type: string;
            /** Updated At */
            updated_at: string | null;
        };
        /** MedicationToggled */
        MedicationToggled: {
            /** Is Taken */
            is_taken: boolean;
            /**
             * Status
             * @default success
             * @constant
             */
            status?: "success";
        };
        /** MessageCreate */
        MessageCreate: {
            /** Content */
            content: string;
            /** Message Id */
            message_id?: string | null;
            /**
             * Message Type
             * @default text
             */
            message_type?: string;
            /** Sender Type */
            sender_type?: string | null;
        };
        /** ModerationAction */
        ModerationAction: {
            /**
             * Action
             * @enum {string}
             */
            action: "approve" | "remove" | "escalate" | "dismiss" | "reject" | "warn" | "flag";
        };
        /** MoodCreate */
        MoodCreate: {
            /** Anxiety Level */
            anxiety_level?: number | null;
            /** Emotions */
            emotions?: string[];
            /** Energy Level */
            energy_level?: number | null;
            /** Moodindex */
            moodIndex: number;
            /**
             * Notes
             * @default
             */
            notes?: string;
            /** Sleep Quality */
            sleep_quality?: string | null;
        };
        /** MoodRecord */
        MoodRecord: {
            /** Anxiety Level */
            anxiety_level: number | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Emotions */
            emotions: string[];
            /** Energy Level */
            energy_level: number | null;
            /** Id */
            id: string;
            /** Mood */
            mood: string;
            /** Notes */
            notes: string;
            /** Sleep Quality */
            sleep_quality: string | null;
        };
        /** NormalUserAppointmentView */
        NormalUserAppointmentView: {
            gender?: components["schemas"]["GenderEnum"] | null;
            /** Name */
            name: string;
            /** Profile Pic */
            profile_pic?: string | null;
            /** User Id */
            user_id: string;
        };
        /** NormalUserBase */
        NormalUserBase: {
            /** Address */
            address: string | null;
            /** Age Range */
            age_range?: string | null;
            /** Bio */
            bio: string | null;
            /** City */
            city: string | null;
            /** Country */
            country: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Dob */
            dob: string | null;
            /** Email */
            email?: string | null;
            /** Emergency Contact Name */
            emergency_contact_name?: string | null;
            /** Emergency Contact Phone */
            emergency_contact_phone?: string | null;
            /** Emergency Contact Relation */
            emergency_contact_relation?: string | null;
            gender: components["schemas"]["GenderEnum"] | null;
            /**
             * Is Email Verified
             * @default false
             */
            is_email_verified?: boolean;
            /**
             * Is Phone Verified
             * @default false
             */
            is_phone_verified?: boolean;
            /** Last Login At */
            last_login_at: string | null;
            /** Mental Health History */
            mental_health_history?: string | null;
            /** Name */
            name: string;
            /** Phone Number */
            phone_number?: string | null;
            /** Pincode */
            pincode: string | null;
            /** Preferred Languages */
            preferred_languages: string[] | null;
            /** Primary Concerns */
            primary_concerns: string[] | null;
            /**
             * Privacy Policy Accepted
             * @default false
             */
            privacy_policy_accepted?: boolean;
            /** Profile Pic */
            profile_pic: string | null;
            /** State */
            state: string | null;
            /** Stress Factors */
            stress_factors?: string | null;
            /** Symptoms */
            symptoms?: string | null;
            /**
             * Terms Accepted
             * @default false
             */
            terms_accepted?: boolean;
            /** Therapy Goals */
            therapy_goals?: string | null;
            /** Timezone */
            timezone: string | null;
            /**
             * Total Sessions Attended
             * @default 0
             */
            total_sessions_attended?: number;
            /** User Id */
            user_id: string;
            /** @default normal_user */
            user_type?: components["schemas"]["UserTypeEnum"];
        };
        /** NotificationBase */
        NotificationBase: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Is Read
             * @default false
             */
            is_read?: boolean;
            /** Message */
            message: string;
            /** Notification Id */
            notification_id: string;
            /** Title */
            title: string;
            /** Type */
            type: string;
            /** User Id */
            user_id: string;
            /** User Type */
            user_type: string;
        };
        /** NotificationListResponse */
        NotificationListResponse: {
            /** Notifications */
            notifications: components["schemas"]["NotificationBase"][];
            /**
             * Total
             * @default 0
             */
            total?: number;
        };
        /** OptionSchema */
        OptionSchema: {
            /** Score */
            score: number;
            /** Text */
            text: string;
        };
        /**
         * PaymentMethodEnum
         * @enum {string}
         */
        PaymentMethodEnum: "credit_card" | "debit_card" | "net_banking" | "upi";
        /**
         * PaymentStatusEnum
         * @enum {string}
         */
        PaymentStatusEnum: "pending" | "completed" | "failed" | "refunded";
        /** PlatformAnalytics */
        PlatformAnalytics: {
            /** Admin */
            admin: {
                [key: string]: number;
            };
            /** Content Analytics */
            content_analytics: {
                [key: string]: number;
            };
            /** Counsellors */
            counsellors: {
                [key: string]: number;
            };
            /** Normal Users */
            normal_users: {
                [key: string]: number;
            };
        };
        /** PostCreate */
        PostCreate: {
            /** Content */
            content: string;
            /**
             * Group Id
             * @default
             */
            group_id?: string;
            /**
             * Has Trigger Warning
             * @default false
             */
            has_trigger_warning?: boolean;
            /**
             * Is Anonymous
             * @default false
             */
            is_anonymous?: boolean;
        };
        /** PostInteract */
        PostInteract: {
            /**
             * Action
             * @enum {string}
             */
            action: "hug" | "relate" | "like";
        };
        /** PrescriptionBase */
        PrescriptionBase: {
            /** Counsellor Id */
            counsellor_id?: string | null;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Diagnosis */
            diagnosis?: string | null;
            /** Medications */
            medications?: {
                [key: string]: unknown;
            }[] | null;
            /** Prescription Id */
            prescription_id: string;
            /** Recommendations */
            recommendations?: string[] | null;
            /** Session Id */
            session_id: string;
            /** User Id */
            user_id: string;
        };
        /** PrescriptionCreate */
        PrescriptionCreate: {
            /** Diagnosis */
            diagnosis: string;
            /**
             * Medications
             * @example [
             *       {
             *         "dosage": "10mg",
             *         "frequency": "daily",
             *         "name": "Medication A"
             *       }
             *     ]
             */
            medications: {
                [key: string]: unknown;
            }[];
            /**
             * Recommendations
             * @example [
             *       "Follow up in 2 weeks",
             *       "Get blood work done"
             *     ]
             */
            recommendations: string[];
            /** Session Id */
            session_id: string;
            /** User Id */
            user_id: string;
        };
        /** PrescriptionListResponse */
        PrescriptionListResponse: {
            /** Prescriptions */
            prescriptions: components["schemas"]["PrescriptionBase"][];
            /** Total Count */
            total_count: number;
        };
        /** QuestionResponseSchema */
        QuestionResponseSchema: {
            /** Question Id */
            question_id: number;
            /** Selected Option Score */
            selected_option_score: number;
        };
        /** QuestionSchema */
        QuestionSchema: {
            /** Id */
            id: number;
            /** Options */
            options: components["schemas"]["OptionSchema"][];
            /** Question */
            question: string;
            /** Questiontype */
            questionType: string;
        };
        /** RecordCreated */
        RecordCreated: {
            /** Id */
            id: string;
            /**
             * Status
             * @default success
             * @constant
             */
            status?: "success";
        };
        /** ReviewCreate */
        ReviewCreate: {
            /** Appointment Id */
            appointment_id: string;
            /** Content */
            content: string;
            /** Rating */
            rating: number;
        };
        /** ScoreRequestSchema */
        ScoreRequestSchema: {
            /** Responses */
            responses: components["schemas"]["QuestionResponseSchema"][];
        };
        /** ScoreResponseSchema */
        ScoreResponseSchema: {
            /** Final Score */
            final_score: number;
            /** Max Score */
            max_score: number;
            /** Result */
            result: string;
        };
        /** SessionAppointmentView */
        SessionAppointmentView: {
            /**
             * Session Expires At
             * Format: date-time
             */
            session_expires_at: string;
            /** Session Id */
            session_id: string;
            /**
             * Session Scheduled At
             * Format: date-time
             */
            session_scheduled_at: string;
        };
        /** SleepCreate */
        SleepCreate: {
            /** Date */
            date?: string | null;
            /** Deep Sleep Hours */
            deep_sleep_hours?: number | null;
            /** Duration Hours */
            duration_hours: number;
            /** Quality */
            quality?: string | null;
        };
        /** SleepRecord */
        SleepRecord: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /**
             * Date
             * Format: date
             */
            date: string;
            /** Deep Sleep Hours */
            deep_sleep_hours: number | null;
            /** Duration Hours */
            duration_hours: number;
            /** Id */
            id: string;
            /** Quality */
            quality: string | null;
        };
        /** SupportGroupResponse */
        SupportGroupResponse: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Description */
            description: string;
            /** Id */
            id: string;
            /** Member Count */
            member_count: number;
            /** Name */
            name: string;
        };
        /** TextInput */
        TextInput: {
            /** Text */
            text: string;
        };
        /** TopupWalletRequest */
        TopupWalletRequest: {
            /** Amount */
            amount: number | string;
        };
        /** UpdateAvailabilitySlot */
        UpdateAvailabilitySlot: {
            /** End Time */
            end_time?: string | null;
            /** Notes */
            notes?: string | null;
            /** Start Time */
            start_time?: string | null;
        };
        /** UpdateTitleRequest */
        UpdateTitleRequest: {
            /** Title */
            title: string;
        };
        /** UpdateTitleResponse */
        UpdateTitleResponse: {
            /** Message */
            message: string;
            /** Title */
            title: string;
        };
        /** UserAnalytics */
        UserAnalytics: {
            /** Behavior */
            behavior: {
                [key: string]: number | null;
            };
            /** Demographics */
            demographics: {
                [key: string]: {
                    [key: string]: number;
                };
            };
            /** Trends */
            trends: {
                [key: string]: {
                    [key: string]: number;
                };
            };
        };
        /**
         * UserDirectoryEntry
         * @description Account management must not expose a patient's clinical intake.
         */
        UserDirectoryEntry: {
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            /** Email */
            email?: string | null;
            /**
             * Is Email Verified
             * @default false
             */
            is_email_verified?: boolean;
            /**
             * Is Phone Verified
             * @default false
             */
            is_phone_verified?: boolean;
            /** Name */
            name: string;
            /** User Id */
            user_id: string;
        };
        /** UserListResponse */
        UserListResponse: {
            /**
             * Limit
             * @default 10
             */
            limit?: number | null;
            /**
             * Offset
             * @default 0
             */
            offset?: number | null;
            /** Total */
            total: number;
            /** Users */
            users: components["schemas"]["UserDirectoryEntry"][];
        };
        /** UserLoginResponse */
        UserLoginResponse: {
            /** Access Token */
            access_token: string;
            /** Last Login At */
            last_login_at: string | null;
            /** Status */
            status: string;
            /** Token Type */
            token_type: string;
            /** User Id */
            user_id: string;
            user_type: components["schemas"]["UserTypeEnum"];
        };
        /** UserPaymentBase */
        UserPaymentBase: {
            /** Amount */
            amount: number;
            /** Appointment Id */
            appointment_id?: string | null;
            /**
             * Currency
             * @default INR
             */
            currency?: string;
            /** Payment Gateway */
            payment_gateway: string;
            /** Payment Id */
            payment_id: string;
            payment_method: components["schemas"]["PaymentMethodEnum"];
            /** Payment Receipt Url */
            payment_receipt_url: string;
            /** @default pending */
            status?: components["schemas"]["PaymentStatusEnum"];
            /**
             * Transaction Date
             * Format: date-time
             */
            transaction_date: string;
            /** Transaction Id */
            transaction_id: string;
            /** User Id */
            user_id: string;
        };
        /** UserPaymentInitiate */
        UserPaymentInitiate: {
            /** Amount */
            amount: number | string;
            /** Appointment Id */
            appointment_id: string;
            /**
             * Currency
             * @default INR
             */
            currency?: string;
            payment_method: components["schemas"]["PaymentMethodEnum"];
        };
        /** UserPaymentInitiateResponse */
        UserPaymentInitiateResponse: {
            /** Amount */
            amount: number;
            appointment: components["schemas"]["AppointmentBase"];
            /** Appointment Id */
            appointment_id?: string | null;
            /**
             * Currency
             * @default INR
             */
            currency?: string;
            /** Message */
            message: string;
            /** Payment Gateway */
            payment_gateway: string;
            /** Payment Id */
            payment_id: string;
            payment_method: components["schemas"]["PaymentMethodEnum"];
            /** Payment Receipt Url */
            payment_receipt_url: string;
            /** Payment Response */
            payment_response: {
                [key: string]: unknown;
            } | null;
            /** @default pending */
            status?: components["schemas"]["PaymentStatusEnum"];
            /**
             * Transaction Date
             * Format: date-time
             */
            transaction_date: string;
            /** Transaction Id */
            transaction_id: string;
            user: components["schemas"]["NormalUserBase"];
            /** User Id */
            user_id: string;
        };
        /** UserPaymentListResponse */
        UserPaymentListResponse: {
            /** Limit */
            limit: number;
            /** Offset */
            offset: number;
            /** Payments */
            payments: components["schemas"]["UserPaymentBase"][];
            /** Total Amount */
            total_amount: number;
            /** Total Count */
            total_count: number;
        };
        /**
         * UserTypeEnum
         * @enum {string}
         */
        UserTypeEnum: "normal_user" | "counsellor" | "admin";
        /** UserUpdateResponse */
        UserUpdateResponse: {
            /** Message */
            message: string;
            user: components["schemas"]["NormalUserBase"];
        };
        /** ValidationError */
        ValidationError: {
            /** Context */
            ctx?: Record<string, never>;
            /** Input */
            input?: unknown;
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** VerifyPaymentRequest */
        VerifyPaymentRequest: {
            /** Payment Id */
            payment_id: string;
        };
        /** VoiceInput */
        VoiceInput: {
            /** Audio Url */
            audio_url: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    root__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    get_counsellor_analytics_admin_analytics_counsellors_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorAnalytics"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_platform_analytics_admin_analytics_platform_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PlatformAnalytics"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_user_analytics_admin_analytics_users_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserAnalytics"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    anonymize_user_data_admin_anonymize__user_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_counsellors_admin_counsellors_get: {
        parameters: {
            query?: {
                certifications?: string[] | null;
                city?: string | null;
                country?: string | null;
                email?: string | null;
                gender?: components["schemas"]["GenderEnum"] | null;
                is_approved?: boolean | null;
                is_email_verified?: boolean | null;
                is_featured?: boolean | null;
                is_phone_verified?: boolean | null;
                languages?: string[] | null;
                limit?: number;
                max_experience?: number | null;
                max_fee?: number | null;
                min_experience?: number | null;
                min_fee?: number | null;
                name?: string | null;
                offset?: number;
                phone_number?: string | null;
                sort_by?: "created_at" | "name" | "session_fee" | "experience_years" | "average_rating";
                sort_order?: "asc" | "desc";
                specializations?: string[] | null;
                state?: string | null;
                user_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    approve_counsellor_admin_counsellors_approve__counsellor_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                counsellor_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ApproveCounsellorResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    disapprove_counsellor_admin_counsellors_disapprove__counsellor_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                counsellor_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisapprovalCounsellorResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_admin_dashboard_admin_dashboard_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_admin_profile_admin_dashboard_profile_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_admin_profile_admin_dashboard_profile_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Body_update_admin_profile_admin_dashboard_profile_patch"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminUpdateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_disorders_admin_disorders_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisordersListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    add_disorder_admin_disorders_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DisorderCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisorderCreateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_disorder_admin_disorders__disorder_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                disorder_id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["DisorderUpdate"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisorderUpdateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    bulk_create_disorders_admin_disorders_bulk_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "multipart/form-data": components["schemas"]["Body_bulk_create_disorders_admin_disorders_bulk_post"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisorderBulkCreateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_admins_admin_management_get: {
        parameters: {
            query?: {
                email?: string | null;
                gender?: components["schemas"]["GenderEnum"] | null;
                is_approved?: boolean | null;
                is_email_verified?: boolean | null;
                is_phone_verified?: boolean | null;
                limit?: number;
                name?: string | null;
                offset?: number;
                phone_number?: string | null;
                role?: components["schemas"]["AdminRoleEnum"] | null;
                sort_by?: "created_at" | "name" | "role";
                sort_order?: "asc" | "desc";
                user_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_admin_admin_management__admin_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                admin_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_admin_admin_management_add_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AdminCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AdminCreateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    apply_moderation_action_admin_moderation__item_id__action_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                item_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ModerationAction"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_crisis_logs_admin_moderation_crisis_logs_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_moderation_queue_admin_moderation_queue_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    right_to_delete_user_admin_right_to_delete__user_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_counselling_session_rooms_admin_sessions_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_session_rooms_admin_sessions__session_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_normal_users_admin_users_get: {
        parameters: {
            query?: {
                city?: string | null;
                country?: string | null;
                email?: string | null;
                gender?: components["schemas"]["GenderEnum"] | null;
                is_email_verified?: boolean | null;
                is_phone_verified?: boolean | null;
                limit?: number;
                name?: string | null;
                offset?: number;
                phone_number?: string | null;
                preferred_languages?: string[] | null;
                sort_by?: "created_at" | "name" | "last_login_at";
                sort_order?: "asc" | "desc";
                state?: string | null;
                user_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    trigger_crisis_alert_ai_insights_crisis_alert_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CrisisInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    analyze_sentiment_ai_insights_sentiment_analysis_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TextInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_ai_summary_ai_insights_summary_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    analyze_voice_tone_ai_insights_voice_analysis_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VoiceInput"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    ai_chat_ai_chat_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AIChatRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AIChatResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_ai_chat_history_ai_chat__session_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    match_counsellor_ai_match_counsellor_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AIMatchResponse"];
                };
            };
        };
    };
    list_ai_sessions_ai_sessions_get: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_ai_session_ai_sessions__session_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_ai_chat_history_ai_sessions__session_id__history_get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_bdi_data_assessments_bdi_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AssessmentSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_hdrs_data_assessments_hdrs_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AssessmentSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_phq9_data_assessments_phq9_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AssessmentSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    bdi_score_assessments_score_bdi_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ScoreRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ScoreResponseSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_comprehensive_scores_assessments_score_comprehensive_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ComprehensiveScoreResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    hdrs_score_assessments_score_hdrs_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ScoreRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ScoreResponseSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    phq9_score_assessments_score_phq9_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ScoreRequestSchema"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ScoreResponseSchema"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    firebase_login_auth_firebase_login_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FirebaseLoginRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserLoginResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    firebase_register_auth_firebase_register_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FirebaseRegisterRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserLoginResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_chat_rooms_chat_rooms_get: {
        parameters: {
            query?: {
                user_id?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_chat_history_chat_rooms__room_id__messages_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path: {
                room_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_message_chat_rooms__room_id__messages_post: {
        parameters: {
            query?: {
                user_id?: string | null;
            };
            header?: never;
            path: {
                room_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MessageCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_general_feed_community_feed_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityPostResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_support_groups_community_groups_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SupportGroupResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_group_feed_community_groups__group_id__feed_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path: {
                group_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CommunityPostResponse"][];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_post_community_posts_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecordCreated"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    interact_with_post_community_posts__post_id__interact_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostInteract"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    submit_contact_form_contact_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContactFormRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContactFormResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_counsellors_content_counsellors_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorListWebView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_counsellor_content_counsellors__counsellor_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                counsellor_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorWebView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_counsellor_reviews_content_counsellors__counsellor_id__reviews_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path: {
                counsellor_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    submit_counsellor_review_content_counsellors__counsellor_id__reviews_post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                counsellor_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ReviewCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_disorders_content_disorders_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DisordersListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_appointments_counsellor_appointments_get: {
        parameters: {
            query?: {
                limit?: number;
                status?: string;
                upcoming?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppointmentListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_appointment_details_counsellor_appointments__appointment_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appointment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppointmentBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    cancel_appointment_counsellor_appointments_cancel__appointment_id__patch: {
        parameters: {
            query?: {
                reason?: string;
            };
            header?: never;
            path: {
                appointment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CancelAppointmentResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_availability_counsellor_availability_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AvailableSlotsResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    add_availability_counsellor_availability_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["AddAvailabilitySlot"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AvailableSlot"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    remove_availability_counsellor_availability__slot_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slot_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_availability_counsellor_availability__slot_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                slot_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateAvailabilitySlot"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AvailableSlot"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_dashboard_counsellor_dashboard_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorDashboardView"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_profile_counsellor_dashboard_profile_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_counsellor_counsellor_dashboard_profile_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_profile_counsellor_dashboard_profile_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Body_update_profile_counsellor_dashboard_profile_patch"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorUpdateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_payments_counsellor_payments_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorPaymentListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_payment_details_counsellor_payments__payment_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                payment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellorPaymentBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_prescription_counsellor_prescriptions_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PrescriptionCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrescriptionBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_prescriptions_counsellor_prescriptions__user_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Target patient user ID */
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrescriptionListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_session_rooms_counsellor_sessions_delete__session_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    join_session_counsellor_sessions_join__session_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellingSessionJoinResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_exercises_exercises__get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_exercise_by_id_exercises__exercise_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                exercise_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_notifications_notifications_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NotificationListResponse"];
                };
            };
        };
    };
    mark_notification_read_notifications__notification_id__read_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                notification_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_payment_intent_payments_create_intent_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreatePaymentIntentRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreatePaymentIntentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_payment_history_payments_history_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    get_wallet_payments_wallet_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    topup_wallet_payments_wallet_topup_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TopupWalletRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_appointments_user_appointments_get: {
        parameters: {
            query?: {
                limit?: number;
                status?: string;
                upcoming?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppointmentListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    book_appointment_user_appointments_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateAppointmentRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CreateAppointmentResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_appointment_user_appointments__appointment_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                appointment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AppointmentBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    cancel_appointment_user_appointments_cancel__appointment_id__patch: {
        parameters: {
            query?: {
                reason?: string;
            };
            header?: never;
            path: {
                appointment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CancelAppointmentResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_available_slots_user_appointments_slots_get: {
        parameters: {
            query?: {
                counsellor_id?: string;
                date?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AvailableSlotsResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_sessions_user_chatbot_get: {
        parameters: {
            query?: {
                limit?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatSessionListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_session_user_chatbot_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["ChatSessionCreateRequest"] | null;
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatSessionResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_all_sessions_user_chatbot_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_session_user_chatbot__session_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatSessionResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_session_user_chatbot__session_id__delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_session_history_user_chatbot_history__session_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatHistoryResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    chat_inference_user_chatbot_inference__session_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChatRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChatResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    stream_chat_endpoint_user_chatbot_inference_stream__session_id__post: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ChatRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_title_user_chatbot_title__session_id__patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTitleRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UpdateTitleResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_dashboard_user_dashboard_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DashboardOverviewResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_profile_user_dashboard_profile_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NormalUserBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    delete_account_user_dashboard_profile_delete: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    update_profile_user_dashboard_profile_patch: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "multipart/form-data": components["schemas"]["Body_update_profile_user_dashboard_profile_patch"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserUpdateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    payment_history_user_payments_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPaymentListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    payment_details_user_payments__payment_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                payment_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPaymentBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    initiate_payment_user_payments_initiate_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserPaymentInitiate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserPaymentInitiateResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    verify_payment_user_payments_verify_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["VerifyPaymentRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    list_prescriptions_user_prescriptions_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrescriptionListResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_prescription_user_prescriptions__prescription_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                prescription_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PrescriptionBase"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    join_session_user_sessions_join__session_id__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                session_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CounsellingSessionJoinResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_therapists_user_therapists__get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_biofeedback_user_tracking_biofeedback_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BiofeedbackResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_correlation_data_user_tracking_correlation_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CorrelationResponse"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_goals_user_tracking_goals_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GoalRecord"][];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    create_goal_user_tracking_goals_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GoalCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecordCreated"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    increment_goal_user_tracking_goals__goal_id__increment_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                goal_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GoalProgress"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_journal_entries_user_tracking_journal_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JournalRecord"][];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    submit_journal_user_tracking_journal_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["JournalCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["JournalCreated"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_medications_user_tracking_medications_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MedicationRecord"][];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    add_medication_user_tracking_medications_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MedicationCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecordCreated"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    toggle_medication_user_tracking_medications__med_id__toggle_patch: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                med_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MedicationToggled"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    log_mood_user_tracking_mood_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["MoodCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecordCreated"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_mood_history_user_tracking_mood_history_get: {
        parameters: {
            query?: {
                end_date?: string | null;
                limit?: number;
                offset?: number;
                start_date?: string | null;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MoodRecord"][];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    get_sleep_history_user_tracking_sleep_get: {
        parameters: {
            query?: {
                limit?: number;
                offset?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SleepRecord"][];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    log_sleep_user_tracking_sleep_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["SleepCreate"];
            };
        };
        responses: {
            /** @description Successful Response */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RecordCreated"];
                };
            };
            /** @description Not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
            /** @description Internal server error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
