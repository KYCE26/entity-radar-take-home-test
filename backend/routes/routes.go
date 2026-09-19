package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api/entities")
	{
		api.GET("", controllers.GetEntities)
		api.GET("/:id", controllers.GetEntity)
		api.POST("", controllers.CreateEntity)
		api.PUT("/:id", controllers.UpdateEntity)
		api.DELETE("/:id", controllers.DeleteEntity)
	}
}