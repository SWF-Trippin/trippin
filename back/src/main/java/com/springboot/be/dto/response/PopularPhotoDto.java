package com.springboot.be.dto.response;

import com.springboot.be.entity.Photo;

public record PopularPhotoDto(
        Long photoId,
        String title, // photo.post.title
        String content,
        String imageUrl,
        int likeCount,
        int commentCount,
        String createdAt,
        Marker marker,
        Author author
) {
    public record Marker(Long id, String placeName, double latitude, double longitude) {}
    public record Author(String name, String profileImage) {}

    public static PopularPhotoDto from(Photo photo) {
        var post = photo.getPost();
        var marker = photo.getMarker();

        return new PopularPhotoDto(
                photo.getId(),
                post != null ? post.getTitle() : null,
                photo.getContent(),
                photo.getImageUrl(),
                photo.getLikeCount(),
                photo.getComments() != null ? photo.getComments().size() : 0,
                photo.getCreatedAt() != null ? photo.getCreatedAt().toString() : null,
                marker != null
                        ? new Marker(
                        marker.getId(),
                        marker.getGlobalPlace().getPlaceName(),
                        marker.getGlobalPlace().getLatitude(),
                        marker.getGlobalPlace().getLongitude()
                )
                        : null,
                post != null && post.getUser() != null
                        ? new Author(
                        post.getUser().getUsername(),
                        post.getUser().getProfileImage()
                )
                        : null
        );
    }
}