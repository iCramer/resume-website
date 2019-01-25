<?php
    $response = array( 'success' => false );

        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        if ( $name != '' && $message != '' ) {
            $mailTo = 'iancramer55@gmail.com';
            $subject = 'Ian Cramer Graphics Message';
            $body  = "From: " . $name . "\n\n";
            $body .= "Email: " . $email . "\n\n";
            $body .= "Message:\n\n" . $message . "\n\n";

            $success = mail( $mailTo, $subject, $body );

            if ( $success ) {
                $response[ 'success' ] = true;
            }
        }

    echo json_encode( $response );
?>