package com.sparta.demo.redis.config.handler;

import com.sparta.demo.exception.CustomException;
import com.sparta.demo.redis.chat.model.ChatMessage;
import com.sparta.demo.redis.chat.repository.ChatMessageRepository;
import com.sparta.demo.redis.chat.repository.ChatRoomRepository;
import com.sparta.demo.redis.chat.service.ChatService;
import com.sparta.demo.security.jwt.JwtDecoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

import static com.sparta.demo.exception.ErrorCode.NOT_FOUND_DEBATE_ID;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;
    private final ChatService chatService;
    private final ChatMessageRepository chatMessageRepository;

    // websocket 을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        log.info("30, simpDestination : {}", message.getHeaders().get("simpDestination"));
        log.info("31, sessionId : {}", message.getHeaders().get("simpSessionId"));
        String sessionId = "";

        // websocket 연결시 헤더의 jwt token 검증
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String token = accessor.getFirstNativeHeader("Authorization");
            if (token != null) {
                token = token.substring(7);
            }
            System.out.println("StompHandler token = " + token);
            jwtDecoder.isValidToken(token);
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
            sessionId = (String) message.getHeaders().get("simpSessionId");
            String roomId = chatService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));

            log.info("roomId, 45 : {}", roomId);

            chatMessageRepository.setUserEnterInfo(roomId, sessionId);
            chatMessageRepository.plusUserCnt(roomId);
        } else if (StompCommand.DISCONNECT == accessor.getCommand()) {
            sessionId = (String) message.getHeaders().get("simpSessionId");
            log.info("DISCONNECT : {}", sessionId);
            String roomId = chatMessageRepository.getRoomId(sessionId);
            log.info("세션으로 가져오는 roomId, 50 : {}", roomId);

            chatMessageRepository.minusUserCnt(roomId);
            log.info("minusUserCnt : {}", chatMessageRepository.minusUserCnt(roomId));

            // 클라이언트 퇴장 메시지를 채팅방에 발송한다.(redis publish)
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            chatService.sendChatMessage(ChatMessage.builder().type(ChatMessage.MessageType.QUIT).roomId(roomId).sender(name).build());

            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
            chatMessageRepository.removeUserEnterInfo(sessionId);

        }
        return message;
    }
}
